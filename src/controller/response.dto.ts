import { HttpStatus } from '@nestjs/common';
import { InsertItemDTO } from './stockState.dto';

export class ResponseService {
  code: HttpStatus;

  description: string;

  data?: InsertItemDTO;

  constructor(code: HttpStatus, description: string, data?: InsertItemDTO) {
    this.code = code;
    this.description = description;
    this.data = data;
  }
}
