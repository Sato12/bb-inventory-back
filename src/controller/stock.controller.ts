import { Body, Controller, Post } from '@nestjs/common';
import { InsertItemDTO } from './stockState.dto';
import { IStockService } from './stock.service';
import { API_PATH_INSERT, API_VERSION } from 'src/config/server.config';

@Controller(`${API_VERSION}`)
export class StockController {
  constructor(private readonly stockService: IStockService) {}

  @Post(`/${API_PATH_INSERT}`)
  insertItem(@Body() item: InsertItemDTO): Promise<void> {
    return this.stockService.insertItem(item);
  }
}
