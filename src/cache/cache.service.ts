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

  async addViewerCount(streamKey: string) {
    const key = `${streamKey}_viewer_count`;
    const selectValue: number = await this.cacheManager.get(key);
    const saveValue = selectValue ? selectValue + 1 : 1;
    await this.cacheManager.set(key, saveValue);
    return true;
  }

  async removeViewerCount(streamKey: string) {
    const key = `${streamKey}_viewer_count`;
    const selectValue: number = await this.cacheManager.get(key);
    const saveValue = selectValue ? selectValue - 1 : 0;
    await this.cacheManager.set(key, saveValue);
    return true;
  }

  async getChat(streamKey: string) {
    const selectValue: ChatDto[] | null = await this.cacheManager.get(streamKey);
    return selectValue ? selectValue.slice(selectValue.length - 6, selectValue.length) : [];
  }

  async getViewerCount(streamKey: string) {
    const key = `${streamKey}_viewer_count`;
    const selectValue: number = await this.cacheManager.get(key);
    return selectValue ? selectValue : 1;
  }

}
