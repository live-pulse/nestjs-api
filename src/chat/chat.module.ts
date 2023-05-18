import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
