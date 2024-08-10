import { Injectable } from "@nestjs/common";
import { InsertItemDTO } from "../stockState.dto";

/**
   * Class for service operations
   */
@Injectable()
export class StockService {

  constructor(){}
  /**
   * @param item information related to product
   */
  async insertItem(item: InsertItemDTO): Promise<void>{

    console.log('Service class logic ....');
  };

}
