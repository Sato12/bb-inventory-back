import { Injectable } from '@nestjs/common';
import { ConsultItemDTO, InsertItemDTO, UpdateItemStateDTO } from 'src/controller/stockState.dto';

/**
 * Abstract class to create an interface for business logic
 */
@Injectable()
export abstract class IStockUc {
  /**
   * @param item information related to product
   */
  abstract insertItem(item: InsertItemDTO): Promise<InsertItemDTO>;

  /**
   * @param itemInfo information related to product
   */
  abstract updateItem(itemInfo: UpdateItemStateDTO): Promise<InsertItemDTO>;

  /**
   * @param serialNumber information related to product
   */
  abstract consultItem(serialNumber: ConsultItemDTO): Promise<InsertItemDTO>;
}
