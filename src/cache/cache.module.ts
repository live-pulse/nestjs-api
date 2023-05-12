import { Module } from '@nestjs/common';
import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager';
import { CacheManagerProvider } from 'src/common/database/configuration';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheManagerModule.registerAsync({
      useFactory: () => CacheManagerProvider.forRoot(redisStore)
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
