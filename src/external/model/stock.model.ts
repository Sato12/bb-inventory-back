import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Definition of stock model for StockStatus collection
 * @author Santiago Gonzalez
 */

@Schema({ versionKey: false })
export class StockStatusModel extends Document {
  @Prop({ unique: true, required: true })
  serialNumber: string;

  @Prop({ required: true })
  productType: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  state: string;
}

export const StockSchema = SchemaFactory.createForClass(StockStatusModel);
StockSchema.index({ serialNumber: 1 }, { unique: true });

