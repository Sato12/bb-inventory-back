import { HttpStatus } from '@nestjs/common';

export class CustomException {
  status: HttpStatus;

  description: string;

  error: any;

  constructor(status: HttpStatus, description: string, error: any) {
    this.status = status;
    this.description = description;
    this.error = error;
  }
}
