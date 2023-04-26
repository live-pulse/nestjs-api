import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSaveRequest } from './dto/request/save.request';
import { UserSignInRequest } from './dto/request/sign.in.request';
import { UserUpdateRequest } from './dto/request/update.request';
import { UserId } from 'src/common/auth/user.param';
import { ApiResponse } from 'src/common/response/api.response';
import { UserGuard } from 'src/common/auth/user.guard';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @UseGuards(UserGuard)
  @Get()
  async getUser(@UserId() id: number) {
    const result = await this.userService.findUser(id);
    return ApiResponse.SUCCESS(result);
  }

  @Post()
  async createUser(@Body() request: UserSaveRequest) {
    const result = await this.userService.create(request);
    return ApiResponse.SUCCESS(result);
  }

  @Post('/sign-in')
  async signIn(@Body() request: UserSignInRequest) {
    const result = await this.userService.signIn(request);
    return ApiResponse.SUCCESS(result);
  }

  @UseGuards(UserGuard)
  @Patch()
  async updateUser(@UserId() id: number, @Body() request: UserUpdateRequest) {
    const result = await this.userService.updateUser(id, request);
    return ApiResponse.SUCCESS(result);
  }

  @UseGuards(UserGuard)
  @Delete()
  async deleteUser(@UserId() id: number) {
    const result = await this.userService.deleteUser(id);
    return ApiResponse.SUCCESS(result);
  }
}
