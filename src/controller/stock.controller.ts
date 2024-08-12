import { Body, Controller, Get, HttpStatus, Patch, Post, Query, Res, UseFilters } from '@nestjs/common';
import { ConsultItemDTO, InsertItemDTO, UpdateItemStateDTO } from './stockState.dto';
import { IStockService } from './stock.service';
import { API_PATH_STATE, API_PATH_TYPES, API_VERSION } from 'src/config/server.config';
import { ResponseService } from './response.dto';
import { ExceptionManager } from 'src/config/exceptionManager.filter';
import { Response } from 'express';

@UseFilters(ExceptionManager)
@Controller(`${API_VERSION}`)
export class StockController {
  constructor(private readonly stockService: IStockService) {}

  @Post(`/${API_PATH_STATE}`)
  async insertItem(@Body() item: InsertItemDTO, @Res() res: Response): Promise<ResponseService> {
    const result = await this.stockService.insertItem(item);
    res.status(HttpStatus.OK).json(result);
    return result;
  }

  @Patch(`/${API_PATH_STATE}`)
  async isnsertItem(@Body() item: UpdateItemStateDTO, @Res() res: Response): Promise<ResponseService> {
    const result = await this.stockService.updateItemState(item);
    res.status(HttpStatus.OK).json(result);
    return result;
  }

  @Get(`/${API_PATH_STATE}`)
  async consultItem(@Query() serialCode: ConsultItemDTO, @Res() res: Response): Promise<ResponseService> {
    const result = await this.stockService.consultItem(serialCode);
    res.status(HttpStatus.OK).json(result);
    return result;
  }

  @Get(`/${API_PATH_TYPES}`)
  async consultItemTypes(@Res() res: Response): Promise<ResponseService> {
    const result = await this.stockService.consultItemType();
    res.status(HttpStatus.OK).json(result);
    return result;
  }
}
