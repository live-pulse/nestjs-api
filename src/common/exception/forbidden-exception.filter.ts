import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../response/api.response';

@Catch(UnauthorizedException)
export class ForBiddenExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ForBiddenExceptionFilter.name);

  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const name = exception.message;
    const message = '권한 오류가 발생했습니다. 잠시후 다시 시도해주세요.';
    const data = ApiResponse.ERROR(status, message, name);
    this.logger.error(exception);

    response
      .status(200)
      .json(data);
  }

}
