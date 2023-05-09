import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ChatDto } from 'src/chat/dto/chat.dto';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async setChat(streamKey: string, value: ChatDto) {
    const selectValue: ChatDto[] = await this.cacheManager.get(streamKey);
    const saveValue = selectValue ? [...selectValue, value] : [value];
    await this.cacheManager.set(streamKey, saveValue);
    return true;
  }

  async getChat(streamKey: string) {
    const selectValue: ChatDto[] = await this.cacheManager.get(streamKey);
    return selectValue.slice(selectValue.length - 6, selectValue.length);
  }

}
