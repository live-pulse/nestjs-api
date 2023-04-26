import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const getConfig = (): TypeOrmModuleOptions => {
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
  }
}

export const getDataSourceConfig = (): DataSourceOptions => {
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
  }
}
