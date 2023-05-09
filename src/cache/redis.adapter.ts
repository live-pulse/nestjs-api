import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ServerOptions } from 'socket.io';

// 클러스터를 위한 클래스
// 작은 프로젝트인데 클러스터를 사용해야하나? 라는 생각에 미사용이다...
// 사용하려면 main.ts에 아래 코드를 추가해주어야한다
// app.useWebSocketAdapter(new RedisIoAdapter(app));
export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    const pubClient = createClient({ url: url });
    const subClient = pubClient.duplicate();

    server.adapter(createAdapter(pubClient, subClient));
    return server;
  }
}
