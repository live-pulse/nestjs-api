import { BroadcastState } from 'src/broadcast/entities/broadcast.state';

export class BroadcastResponse {
  id: number;
  title: string;
  description: string;
  streamKey: string;
  thumbnailImageUrl: string;
  startDate: Date;
  userId: number;
  streamer: string;
  profileUrl: string;
  state: BroadcastState;
  streamUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
