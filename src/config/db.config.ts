export const dbConfigParams = {
  databaseName: 'StockDataBase',
  collStockStatus: 'StockStatus',
  connectionUri: process.env.MONGO ||   `mongodb://127.0.0.1:27017/StockStatus`,
};
