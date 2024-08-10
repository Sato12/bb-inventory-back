import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { IStockService } from './stock.service';
import { StockService } from './impl/stock.service.impl';

@Module({
  controllers: [StockController],
  providers: [
    {
      provide: IStockService,
      useClass: StockService,
    },
  ],
  imports: [],
})
export class ControllerModule {}
