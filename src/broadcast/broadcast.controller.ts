import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { BroadcastService } from './broadcast.service';
import { UserGuard } from 'src/common/auth/user.guard';
import { UserId } from 'src/common/auth/user.param';
import { BroadcastSaveRequest } from './dto/request/save.request';
import { ApiResponse } from 'src/common/response/api.response';

@Controller('/broadcasts')
export class BroadcastController {
  constructor(
    private readonly broadcastService: BroadcastService,
  ) {}

  @Get('/:broadcastId')
  async getBroadcast(@Param('broadcastId') id: number) {
    const result = await this.broadcastService.getOne(id);
    return ApiResponse.SUCCESS(result);
  }

  @UseGuards(UserGuard)
  @Post()
  async createBroadcast(@UserId() userId: number, @Body() request: BroadcastSaveRequest) {
    const result = await this.broadcastService.create(userId, request);
    return ApiResponse.SUCCESS(result);
  }

}
