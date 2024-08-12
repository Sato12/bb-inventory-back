import { HttpStatus, Injectable } from '@nestjs/common';
import { IStockUc } from '../stock.uc';
import { ConsultItemDTO, InsertItemDTO, UpdateItemStateDTO } from 'src/controller/stockState.dto';
import { EValidationProcess, EValidationResultMessages } from 'src/config/enums/tasks.enum';
import { IStockProvider } from 'src/external/stock.provider';
import { CustomException } from 'src/controller/expectedException';

/**
 * Class for business logic
 */
@Injectable()
export class StockUsecase implements IStockUc {
  constructor(readonly externalData: IStockProvider) {}
  /**
   * Logic to insert item in DB
   * @param item information related to product
   */
  async insertItem(item: InsertItemDTO): Promise<InsertItemDTO> {
    console.log('UseCase class logic ....');
    const result = await this.externalData.insert(item);
    const validation = this.evaluateAttribute(result ? result[0] : undefined, this.validateOperationOnDB);

    if (validation.valid) {
      console.log(result);
      return result[0];
    } else {
      throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal error inserting item', result);
    }
  }

  /**
   * Logic to consult item in DB
   * @param item information related to product
   */
  async consultItem(item: ConsultItemDTO): Promise<InsertItemDTO> {
    console.log('UseCase class logic ....');
    const result = await this.externalData.consult(item.serialNumber);
    const validation = this.evaluateAttribute(result, this.validateOperationOnDB);

    if (validation.valid) {
      console.log(result);
      return result;
    } else {
      throw new CustomException(HttpStatus.NOT_FOUND, 'Product not found', result);
    }
  }

  /**
   * Logic to update item in DB
   * @param itemInfo information related to product
   */
  async updateItem(itemInfo: UpdateItemStateDTO): Promise<InsertItemDTO> {
    console.log('UseCase class update logic....');
    const result = await this.externalData.update(itemInfo);
    const validation = this.evaluateAttribute(result, this.validateOperationOnDB);

    if (validation.valid) {
      console.log(result);
      return result;
    } else {
      throw new CustomException(HttpStatus.NOT_FOUND, 'Product not found', result);
    }
  }

  /**
   * Logic to update item in DB
   * @param itemInfo information related to product
   */
  async getItemType(): Promise<any> {
    const result = await this.externalData.getItemTypes();
    return result;
  }

  /**
   * Evaluates the request with different conditions(as functions)
   * It is possible to make custom validations with the headers or body
   * @param eventInfo device
   * @param headers header to validate
   * @param validation function to be fulfilled
   */
  private evaluateAttribute(headers: string | string[], validation: ValidationFunction<string | string[]>): ValidationResult;
  private evaluateAttribute(orderReser: InsertItemDTO, validation: ValidationFunction<InsertItemDTO>): ValidationResult;
  private evaluateAttribute(
    orderReser: InsertItemDTO | string | string[],
    validation: ValidationFunction<string | string[] | InsertItemDTO>,
  ): ValidationResult {
    let isValid: ValidationResult;

    console.log(`Service - Processing validation function: ${validation.process}`);
    isValid = validation(orderReser);
    const result: ValidationResult = {
      valid: isValid.valid,
      description: isValid.description,
    };
    Object.freeze(result);

    this.resultValidationTracing(result);

    return result;
  }

  /**
   * To create traceability when some validation regarding the event body
   * without implying the business logic
   * @param  validation - Object with the results of the validation
   */
  private resultValidationTracing(validation: ValidationResult): void {
    console.log(validation.description);
  }

  /**
   * To compare attribute is true
   * @param typePayment obtained from ecomData legacy
   */
  private validateOperationOnDB: ValidationFunction<InsertItemDTO> = Object.assign(
    (item: InsertItemDTO) => {
      let validationResult: ValidationResult = {
        valid: false,
        description: EValidationResultMessages.FAILED,
      };
      const insertedItem = item;

      if (item && Object.keys(insertedItem).length > 0 && insertedItem.serialNumber) {
        validationResult.valid = true;
        validationResult.description = EValidationResultMessages.SUCCESSFUL;
      }
      return validationResult;
    },
    { process: EValidationProcess.INSERT_VALIDATION },
  );
}

type ValidationFunction<T> = {
  process: string;
  (arg: T): ValidationResult;
};

type ValidationResult = {
  valid: boolean;
  description?: EValidationResultMessages | string;
};
