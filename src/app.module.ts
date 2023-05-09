import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  getDataSourceConfig,
  getConfig
} from './common/database/configuration';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { JwtAccessStrategy } from './common/auth/jwt-access.strategy';
import { BroadcastModule } from './broadcast/broadcast.module';
import { StreamModule } from './stream/stream.module';
import { ChatModule } from './chat/chat.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync(
      {
        useFactory: () => getConfig(),
        dataSourceFactory: async function () {
          return addTransactionalDataSource(new DataSource(getDataSourceConfig()));
        },
      }),
    UserModule,
    BroadcastModule,
    StreamModule,
    ChatModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [JwtAccessStrategy],
})
export class AppModule {}
