import { Module } from '@nestjs/common';
import { IStockProvider } from './stock.provider';
import { StockProvider } from './impl/stock.provider.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfigParams } from 'src/config/db.config';
import { StockSchema, StockStatusModel } from './model/stock.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTypes } from './model/itemType.entity';

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
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql-db',
      port: 3306,
      username: 'User',
      password: '12345',
      database: 'dbItemTypes',
      entities: [ItemTypes],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ItemTypes]),
  ],
  providers: [{ provide: IStockProvider, useClass: StockProvider }],
  exports: [IStockProvider],
})
export class ExternalModule {}
