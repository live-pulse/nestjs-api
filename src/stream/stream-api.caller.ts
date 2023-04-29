import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { StreamSaveRequest } from './dto/request/save.request';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class StreamApiCaller {
  constructor(
    private readonly httpService: HttpService
  ) {}
  private readonly logger = new Logger(StreamApiCaller.name);

  async createStreamKey(streamKey: string) {
    const request = StreamSaveRequest.of(streamKey);
    const requestUrl = this.getRequestUrl('/broadcasts/create');
    const { data } = await firstValueFrom(
      this.httpService.post(requestUrl, request).pipe(
        catchError(e => {
          this.logger.error(e);
          throw new InternalServerErrorException("스트림키 생성 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }))
    );
    return data;
  }

  async deleteStreamKey(streamKey: string) {
    const requestUrl = this.getRequestUrl(`/broadcasts/${streamKey}`);
    const { data } = await firstValueFrom(
      this.httpService.delete(requestUrl).pipe(
        catchError(e => {
          this.logger.error(e);
          throw new InternalServerErrorException("스트림키 삭제 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }))
    );
    return data;
  }

  private getRequestUrl(url: string) {
    return `${process.env.STREAM_API_URL}${url}`;
  }

}
