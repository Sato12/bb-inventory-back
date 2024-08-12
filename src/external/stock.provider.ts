import { Injectable } from '@nestjs/common';
import { InsertItemDTO, UpdateItemStateDTO } from 'src/controller/stockState.dto';

/**
 * Abstract class to create an interface for data providers
 */
@Injectable()
export abstract class IStockProvider {
  /**
   * Insert documents in mongoose collection
   * @param item information related to product
   */
  abstract insert(item: InsertItemDTO): Promise<InsertItemDTO[]>;

  /**
   * Consults documents in mongoose collection
   * @param serialNumber serialNumber related to product
   */
  abstract consult(serialNumber: string): Promise<InsertItemDTO>;

  /**
   * Update document in mongoose collection
   * @param itemInfo serialNumber and state
   */
  abstract update(itemInfo: UpdateItemStateDTO): Promise<InsertItemDTO>;

  /**
   * Update document in mongoose collection
   * @param itemInfo serialNumber and state
   */
  abstract getItemTypes(): Promise<any>;
}
