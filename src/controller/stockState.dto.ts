/**
 * Dto to carry out state operations on items
 * @author Santiago Gonzalez
 */

import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { EItemState } from 'src/config/enums/stockState.enum';

export class InsertItemDTO {
  @IsNotEmpty()
  @IsString()
  serialNumber!: string;

  @IsNotEmpty()
  @IsString()
  productType!: string;

  @IsNotEmpty()
  @IsISO8601()
  date!: string;

  @IsNotEmpty()
  @IsString()
  userName!: string;

  @IsNotEmpty()
  @IsString()
  state!: EItemState;
}
