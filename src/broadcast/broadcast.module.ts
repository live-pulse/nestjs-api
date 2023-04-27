import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Broadcast } from './entities/broadcast.entity';
import { BroadcastController } from './broadcast.controller';
import { BroadcastService } from './broadcast.service';
import { User } from 'src/user/entities/user.entity';
import { StreamApiCaller } from 'src/stream/stream-api.caller';
import { HttpModule } from '@nestjs/axios';

// THINK
// - 왜 StreamModule을 주입하면 안되는가?
// - 왜 StreamApiCaller 자체와 StreamApiCaller에 필요한 HttpModule을 임포트해야되는가?
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Broadcast]),
    HttpModule,
  ],
  controllers: [BroadcastController],
  providers: [BroadcastService, StreamApiCaller]
})
export class BroadcastModule {}
