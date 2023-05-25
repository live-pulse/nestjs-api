import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { CacheService } from 'src/cache/cache.service';
import { ChatDto } from './dto/chat.dto';

@WebSocketGateway(8888)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly cacheService: CacheService,
  ) {}

  private static readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    ChatGateway.logger.debug('Socket Server Init Complete!');
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const [user, streamKey] = this.getParams(client);

    ChatGateway.logger.debug(`Client Connected: [${client.id}] ${user}`,);

    this.server.socketsJoin(streamKey);
    this.server.to(streamKey).emit('sendMessage', ChatDto.of(streamKey, user));
    this.server.to(streamKey).emit('connectViewer', true);
    await this.cacheService.addViewerCount(streamKey);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const [user, streamKey] = this.getParams(client);
    ChatGateway.logger.debug(`Client Disconnected: [${client.id}] ${user}`);
    this.server.to(streamKey).emit('disconnectViewer', true);
    await this.cacheService.removeViewerCount(streamKey);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() request: ChatDto) {
    await this.cacheService.setChat(request.streamKey, request);
    this.server.to(request.streamKey).emit('sendMessage', request);
  }

  @SubscribeMessage('getLastChat')
  async getLastChat(@ConnectedSocket() client: Socket) {
    const streamKey = String(client.handshake.query['streamKey']);
    const chats = await this.cacheService.getChat(streamKey);
    this.server.to(streamKey).emit('getLastChat', chats);
  }

  @SubscribeMessage('getViewerCount')
  async getViewerCount(@ConnectedSocket() client: Socket) {
    const streamKey = String(client.handshake.query['streamKey']);
    const viewerCount = await this.cacheService.getViewerCount(streamKey);
    this.server.to(streamKey).emit('getViewerCount', viewerCount);
  }

  async sendBroadcastStart(streamKey: string) {
    this.server.to(streamKey).emit('broadcastStart', true);
  }

  async sendBroadcastFinish(streamKey: string) {
    this.server.to(streamKey).emit('broadcastFinish', true);
  }

  private getParams(client: Socket) {
    const user = String(client.handshake.query['user']);
    const streamKey = String(client.handshake.query['streamKey']);
    return [user, streamKey];
  }

}
