import { Broadcast } from 'src/broadcast/entities/broadcast.entity';
import { User } from 'src/user/entities/user.entity';

export class BroadcastSaveRequest {
  title: string;
  description: string;
  thumbnailImageUrl: string;
  startDate: Date;
  tags: string[];

  toEntity(user: User) {
    const broadcast = new Broadcast();
    broadcast.title = this.title;
    broadcast.description = this.description;
    broadcast.user = user;
    broadcast.thumbnailImageUrl = this.thumbnailImageUrl;
    broadcast.startDate = this.startDate;
    broadcast.tags = this.tags;
    broadcast.streamKey = Math.random().toString(36).substring(2,11);
    broadcast.streamUrl = `${process.env.STREAM_PREFIX_URL}${broadcast.streamKey}.m3u8`;
    return broadcast;
  }

}
