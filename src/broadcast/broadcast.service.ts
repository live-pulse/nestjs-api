import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Broadcast } from './entities/broadcast.entity';
import { Repository } from 'typeorm';
import { BroadcastSaveRequest } from './dto/request/save.request';
import { User } from '../user/entities/user.entity';

@Injectable()
export class BroadcastService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Broadcast)
    private readonly broadcastRepository: Repository<Broadcast>,
  ) {}

  async getOne(id: number) {
    const broadcast = await this.broadcastRepository.findOne({ where: { id: id }, relations: ['user'] });
    if (!broadcast) throw new NotFoundException('존재하지 않은 방송입니다.');
    return broadcast.toResponse();
  }

  async create(userId: number, request: BroadcastSaveRequest) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const broadcast = request.toEntity(user);
    const resultBroadcast = await this.broadcastRepository.save(broadcast);
    return resultBroadcast.toResponse();
  }

  async start() {

  }

  async finish() {

  }

}
