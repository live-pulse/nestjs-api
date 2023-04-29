import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from 'express';
import { ApiResponse } from 'src/common/response/api.response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.response.statusCode;
    const message = exception.response.message;
    const name = exception.response.error;
    const data = ApiResponse.ERROR(status, message, name);
    this.logger.error(exception);

    response
      .status(status)
      .json(data);
  }

}
