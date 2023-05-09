import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

@WebSocketGateway(8888)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private static readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    ChatGateway.logger.debug('Socket Server Init Complete!');
  }

  handleConnection(@ConnectedSocket() client: Socket): any {
    ChatGateway.logger.debug(
      `Client Connected: [${client.id}] ${client.handshake.query['username']}`,
    );

    this.server.emit('sendMessage', {
      name: `admin`,
      text: `Welcome to the chat, ${client.handshake.query['user']}!`,
    })
  }

  handleDisconnect(client: Socket): any {
    ChatGateway.logger.debug(
      `Client Disconnected: [${client.id}] ${client.handshake.query['username']}`,
    );
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { name: string, text: string }): void {
    this.server.emit('sendMessage', payload);
  }

}
