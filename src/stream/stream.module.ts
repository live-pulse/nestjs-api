import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StreamApiCaller } from './stream-api.caller';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
  providers: [StreamApiCaller],
  exports: [StreamApiCaller],
})
export class StreamModule {}
