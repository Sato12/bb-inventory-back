import { Module } from "@nestjs/common";
import { IStockProvider } from "./stock.provider";
import { StockProvider } from "./impl/stock.provider.impl";
import { MongooseModule } from "@nestjs/mongoose";
import { dbConfigParams } from "src/config/db.config";
import { StockSchema, StockStatusModel } from "./model/stock.model";

@Module({
  imports: [
    //Conexión a base de datos
    MongooseModule.forRoot(dbConfigParams.connectionUri, {
      retryAttempts: 3,
      autoCreate: false,
      autoIndex: false,
    }),
    MongooseModule.forFeature([
      {
        name: StockStatusModel.name,
        schema: StockSchema,
        collection: dbConfigParams.collStockStatus,
      }
    ]),
  ],
  providers: [
    { provide: IStockProvider, useClass: StockProvider },
  ],
  exports: [
    IStockProvider,
  ],
})
export class ExternalModule {}
