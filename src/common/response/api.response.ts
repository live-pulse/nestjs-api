import { HttpStatus } from '@nestjs/common';

export class ApiResponse {
  constructor(status: number, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
  status: number;
  message: string;
  data: any;

  static SUCCESS(data?: any) {
    return new ApiResponse(200, 'success', data || null);
  }

  static ERROR(code: HttpStatus, message: string, data: any) {
    return new ApiResponse(code, message, data);
  }
}
