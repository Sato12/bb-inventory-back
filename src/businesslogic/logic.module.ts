import { ExternalModule } from 'src/external/external.module';
import { IStockUc } from './stock.uc';
import { StockUsecase } from './impl/stock.uc.impl';
import { Module } from '@nestjs/common';

@Module({
  imports: [ExternalModule],
  providers: [{ provide: IStockUc, useClass: StockUsecase }],
  exports: [IStockUc],
})
export class LogicModule {}
