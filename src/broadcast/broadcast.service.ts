import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Broadcast } from './entities/broadcast.entity';
import { Repository } from 'typeorm';
import { BroadcastSaveRequest } from './dto/request/save.request';
import { User } from 'src/user/entities/user.entity';
import { StreamApiCaller } from 'src/stream/stream-api.caller';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class BroadcastService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Broadcast)
    private readonly broadcastRepository: Repository<Broadcast>,

    private readonly streamApiCaller: StreamApiCaller,
  ) {}

  async getOne(id: number) {
    const broadcast = await this.broadcastRepository.findOne({ where: { id: id }, relations: ['user'] });
    if (!broadcast) throw new NotFoundException('존재하지 않은 방송입니다.');
    return broadcast.toResponse();
  }

  @Transactional()
  async create(userId: number, request: BroadcastSaveRequest) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const broadcast = request.toEntity(user);
    const resultBroadcast = await this.broadcastRepository.save(broadcast);
    await this.streamApiCaller.createStreamKey(resultBroadcast.streamKey);
    return resultBroadcast.toResponse();
  }

  async start() {

  }

  async finish() {

  }

}
