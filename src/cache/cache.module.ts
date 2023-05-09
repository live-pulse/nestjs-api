import { Module } from '@nestjs/common';
import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager';
import { getCacheManagerConfig } from 'src/common/database/configuration';
import { redisStore } from 'cache-manager-redis-store';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheManagerModule.registerAsync({
      useFactory: () => getCacheManagerConfig(redisStore)
    })
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
