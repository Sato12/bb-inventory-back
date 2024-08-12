import { Injectable } from "@nestjs/common";
import { ConsultItemDTO, InsertItemDTO, UpdateItemStateDTO } from "./stockState.dto";
import { ResponseService } from "./response.dto";

/**
   * Abstract class to create an interface for service operations
   */
@Injectable()
export abstract class IStockService {

  /**
   * @param item information related to product
   */
  abstract insertItem(item: InsertItemDTO): Promise<ResponseService>;

  /**
   * @param item serial number and state
   */
  abstract updateItemState(item: UpdateItemStateDTO): Promise<ResponseService>;

  /**
   * @param item serial number and state
   */
  abstract consultItem(item: ConsultItemDTO): Promise<ResponseService>;

  /**
   * Get item types
   */
  abstract consultItemType(): Promise<any>;

}
