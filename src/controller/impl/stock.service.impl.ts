import { HttpStatus, Injectable } from '@nestjs/common';
import { ConsultItemDTO, InsertItemDTO } from '../stockState.dto';
import { IStockService } from '../stock.service';
import { IStockUc } from 'src/businesslogic/stock.uc';
import { ResponseService } from '../response.dto';

/**
 * Class for service operations
 */
@Injectable()
export class StockService implements IStockService {
  constructor(readonly stockUC: IStockUc) {}

  /**
   * @param item information related to product
   */
  async insertItem(item: InsertItemDTO): Promise<ResponseService> {
    const result = await this.stockUC.insertItem(item);
    return new ResponseService(HttpStatus.OK, 'Inserted item', result);
  }

  /**
   * @param itemInfo serial number and state
   * 
   */
  async updateItemState(itemInfo: InsertItemDTO): Promise<ResponseService> {
    const result = await this.stockUC.updateItem(itemInfo);
    return new ResponseService(HttpStatus.OK, 'Updated item', result);
  }

  /**
   * @param itemInfo serial number
   * 
   */
  async consultItem(serialNumber: ConsultItemDTO): Promise<ResponseService> {
    const result = await this.stockUC.consultItem(serialNumber);
    return new ResponseService(HttpStatus.OK, 'Item retreived', result);
  }
}
