import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Broadcast } from './entities/broadcast.entity';
import { Repository } from 'typeorm';
import { BroadcastSaveRequest } from './dto/request/save.request';
import { User } from 'src/user/entities/user.entity';
import { StreamApiCaller } from 'src/stream/stream-api.caller';
import { Transactional } from 'typeorm-transactional';
import { ChatGateway } from 'src/chat/chat.gateway';
import { BroadcastState } from './entities/broadcast.state';

@Injectable()
export class BroadcastService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Broadcast)
    private readonly broadcastRepository: Repository<Broadcast>,

    private readonly streamApiCaller: StreamApiCaller,
    private readonly chatGateway: ChatGateway,
  ) {}

  async getLiveBroadcasts() {
    const broadcasts = await this.broadcastRepository.find({
      relations: ['user'],
      where: { state: BroadcastState.BROADCASTING },
      order: { streamKey: 'ASC' },
      take: 5
    });
    return broadcasts.map(broadcast => broadcast.toResponse());
  }

  async getReadyBroadcasts() {
    const broadcasts = await this.broadcastRepository.find({
      relations: ['user'],
      where: { state: BroadcastState.READY },
      order: { streamKey: 'ASC' },
      take: 5
    });
    return broadcasts.map(broadcast => broadcast.toResponse());
  }

  async getOne(streamKey: string) {
    const broadcast = await this.broadcastRepository
      .findOne({ where: { streamKey }, relations: ['user'] });
    if (!broadcast) throw new NotFoundException('존재하지 않은 방송입니다.');
    return broadcast.toResponse();
  }

  @Transactional()
  async create(userId: number, request: BroadcastSaveRequest) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('존재하지 않은 사용자입니다.');
    console.log(request)
    const broadcast = request.toEntity(user);
    const resultBroadcast = await this.broadcastRepository.save(broadcast);
    await this.streamApiCaller.createStreamKey(resultBroadcast.streamKey);
    return resultBroadcast.toResponse();
  }

  @Transactional()
  async start(streamKey: string, userId: number) {
    const broadcast = await this.broadcastRepository
      .findOne({ where: { streamKey }, relations: ['user'] });
    if (!broadcast) throw new NotFoundException('존재하지 않은 방송입니다.');
    if (broadcast.user.id !== userId) throw new ForbiddenException(
      '방송을 시작할 수 없습니다. 로그인한 아이디로 방송을 시작해주세요.'
    );
    if (!broadcast.isReady) throw new BadRequestException(
      `방송을 시작할 수 없습니다. 방송은 ${broadcast.state} 상태입니다.`
    );
    broadcast.start();
    await this.broadcastRepository.save(broadcast);
    await this.chatGateway.sendBroadcastStart(streamKey);
  }

  @Transactional()
  async finish(streamKey: string, userId: number) {
    const broadcast = await this.broadcastRepository
      .findOne({ where: { streamKey }, relations: ['user'] });
    if (!broadcast) throw new NotFoundException('존재하지 않은 방송입니다.');
    if (broadcast.user.id !== userId) throw new ForbiddenException(
      '방송을 종료할 수 없습니다. 로그인한 아이디로 방송을 종료해주세요.'
    );
    broadcast.finish();
    await this.broadcastRepository.save(broadcast);
    await this.streamApiCaller.deleteStreamKey(streamKey);
    await this.chatGateway.sendBroadcastFinish(streamKey);
  }

}
