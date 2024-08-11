import { HttpStatus, Injectable } from '@nestjs/common';
import { InsertItemDTO, UpdateItemStateDTO } from 'src/controller/stockState.dto';
import { IStockProvider } from '../stock.provider';
import { StockStatusModel } from '../model/stock.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomException } from 'src/controller/expectedException';

/**
 * Class for business logic
 */
@Injectable()
export class StockProvider implements IStockProvider {
  constructor(@InjectModel(StockStatusModel.name) readonly stockModel: Model<StockStatusModel>) {}
  /**
   * Inserts document in DB
   * @param item information related to product
   */
  async insert(item: InsertItemDTO): Promise<InsertItemDTO[]> {
    try {
      const consult = await this.consult(item.serialNumber);
      if (consult) throw new Error('Item with that serial number already exists');
      return this.stockModel.insertMany(item);
    } catch (error) {
      if ((error.code && error.code === 11000) || (error instanceof Error && error.message.includes('serial number already exists'))) {
        console.log('Duplicate document');
        throw new CustomException(HttpStatus.CONFLICT, 'Item with that serial number already exists', error);
      }

      throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed operation', error);
    }
  }

  /**
   * Consults document in DB
   * @param serialNumber information related to product
   */
  async consult(serialNumber: string): Promise<InsertItemDTO> {
    try {
      return this.stockModel.findOne({ serialNumber });
    } catch (error) {
      throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed consulting db', error);
    }
  }

  /**
   * Update document in mongoose collection
   * @param itemInfo serialNumber and state
   */
  async update(itemInfo: UpdateItemStateDTO): Promise<InsertItemDTO> {
    try {
      const filter = { serialNumber: itemInfo.serialNumber };
      const update = { state: itemInfo.state };
      const options = {
        new: true,
      };

      return this.stockModel.findOneAndUpdate(filter, update, options);
    } catch (error) {
      throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed updating item on db', error);
    }
  }
}
