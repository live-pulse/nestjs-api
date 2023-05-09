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

  handleConnection(@ConnectedSocket() client: Socket): any {
    const user = String(client.handshake.query['user']);
    const streamKey = String(client.handshake.query['streamKey']);

    ChatGateway.logger.debug(`Client Connected: [${client.id}] ${user}`,);

    this.server.emit('sendMessage', ChatDto.of(user, streamKey));
  }

  handleDisconnect(client: Socket): any {
    ChatGateway.logger.debug(
      `Client Disconnected: [${client.id}] ${client.handshake.query['user']}`,
    );
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, @MessageBody() request: ChatDto) {
    await this.cacheService.setChat(request.streamKey, request);
    this.server.emit('sendMessage', request);
  }

  @SubscribeMessage('getLastChat')
  async getLastChat(client: Socket) {
    const streamKey = String(client.handshake.query['streamKey']);
    const chats = await this.cacheService.getChat(streamKey);
    client.emit('getLastChat', chats);
  }

}
