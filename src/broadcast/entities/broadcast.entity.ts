import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { BroadcastState } from './broadcast.state';
import { BroadcastResponse } from 'src/broadcast/dto/response/response';

@Entity()
export class Broadcast extends BaseEntity {

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ unique: true, nullable: false })
  streamKey: string;

  @Column({ nullable: false })
  thumbnailImageUrl: string;

  @Column({ nullable: false })
  startDate: Date;

  @ManyToOne(() => User, user => user.broadcasts)
  user: User;

  @Column({ type: 'enum', enum: BroadcastState, default: BroadcastState.READY })
  state: BroadcastState;

  @Column({ nullable: false })
  streamUrl: string;

  @Column({ type: 'json', default: '[]', nullable: false })
  tags: string[];

  isReady = () => {
    return this.state === BroadcastState.READY;
  };

  start() {
    this.state = BroadcastState.BROADCASTING;
  }

  finish() {
    this.state = BroadcastState.FINISHED;
  }

  toResponse() {
    const response = new BroadcastResponse();
    response.id = this.id;
    response.title = this.title;
    response.description = this.description;
    response.streamKey = this.streamKey;
    response.thumbnailImageUrl = this.thumbnailImageUrl;
    response.startDate = this.startDate;
    response.userId = this.user.id;
    response.streamer = this.user.name;
    response.profileUrl = this.user.userImageUrl;
    response.state = this.state;
    response.streamUrl = this.streamUrl;
    response.tags = this.tags;
    response.createdAt = this.createdAt;
    response.updatedAt = this.updatedAt;
    return response;
  }
}
