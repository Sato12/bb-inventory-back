import { Injectable } from "@nestjs/common";
import { InsertItemDTO } from "./stockState.dto";

/**
   * Abstract class to create an interface for service operations
   */
@Injectable()
export abstract class IStockService {

  /**
   * @param item information related to product
   */
  abstract insertItem(item: InsertItemDTO): Promise<void>;

}
