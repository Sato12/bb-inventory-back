import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { IStockService } from './stock.service';
import { StockService } from './impl/stock.service.impl';
import { LogicModule } from 'src/businesslogic/logic.module';
import { ExternalModule } from 'src/external/external.module';

@Module({
  controllers: [StockController],
  providers: [
    {
      provide: IStockService,
      useClass: StockService,
    },
  ],
  imports: [LogicModule, ExternalModule],
})
export class ControllerModule {}
