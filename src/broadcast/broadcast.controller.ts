import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';
import { UserGuard } from 'src/common/auth/user.guard';
import { UserId } from 'src/common/auth/user.param';
import { BroadcastSaveRequest } from './dto/request/save.request';
import { ApiResponse } from 'src/common/response/api.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('broadcast')
@Controller('/broadcasts')
export class BroadcastController {
  constructor(
    private readonly broadcastService: BroadcastService,
  ) {}

  @Get('/live')
  async getLiveBroadcasts() {
    const result = await this.broadcastService.getLiveBroadcasts();
    return ApiResponse.SUCCESS(result);
  }

  @Get('/ready')
  async getReadyBroadcasts() {
    const result = await this.broadcastService.getReadyBroadcasts();
    return ApiResponse.SUCCESS(result);
  }

  @Get('/:streamKey')
  async getBroadcast(@Param('streamKey') streamKey: string) {
    const result = await this.broadcastService.getOne(streamKey);
    return ApiResponse.SUCCESS(result);
  }

  @UseGuards(UserGuard)
  @Post()
  async createBroadcast(@UserId() userId: number, @Body() request: BroadcastSaveRequest) {
    const result = await this.broadcastService.create(userId, request);
    return ApiResponse.SUCCESS(result);
  }

  @UseGuards(UserGuard)
  @Post('/:streamKey/start')
  async startBroadcast(@Param('streamKey') streamKey: string, @UserId() userId: number) {
    await this.broadcastService.start(streamKey, userId);
    return ApiResponse.SUCCESS();
  }

  @UseGuards(UserGuard)
  @Post('/:streamKey/finish')
  async finishBroadcast(@Param('streamKey') streamKey: string, @UserId() userId: number) {
    await this.broadcastService.finish(streamKey, userId);
    return ApiResponse.SUCCESS();
  }

}
