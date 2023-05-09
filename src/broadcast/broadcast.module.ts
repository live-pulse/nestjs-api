import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamModule } from 'src/stream/stream.module';
import { Broadcast } from './entities/broadcast.entity';
import { BroadcastController } from './broadcast.controller';
import { BroadcastService } from './broadcast.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Broadcast]),
    StreamModule,
  ],
  controllers: [BroadcastController],
  providers: [BroadcastService]
})
export class BroadcastModule {}
