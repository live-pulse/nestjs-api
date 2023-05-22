import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { CacheModuleOptions } from '@nestjs/cache-manager/dist/interfaces/cache-module.interface';

export class TypeormConfigProvider {
  public static forRoot(): TypeOrmModuleOptions {
    return {
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      logging: process.env.LOGGING === 'true',
      entities: [process.env.ENTITIES],
      synchronize: process.env.SYNCHRONIZE === 'true',
      timezone: 'Asia/Seoul',
    };
  }
}

export class DataSourceConfigProvider {
  public static forRoot(): DataSourceOptions {
    return {
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      logging: process.env.LOGGING === 'true',
      entities: [process.env.ENTITIES],
      synchronize: process.env.SYNCHRONIZE === 'true',
      timezone: 'Asia/Seoul',
    };
  }
}

export class CacheManagerProvider {
  static forRoot(redisStore): CacheModuleOptions {
    return {
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 0,
      legacyMode: true,
      timezone: 'Asia/Seoul',
    }
  }
}
