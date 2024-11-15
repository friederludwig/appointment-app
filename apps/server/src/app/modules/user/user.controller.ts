// user.controller.ts
import { User } from '@appointment-app-hdm/api-interfaces';
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async getUserById(@Param('email') email: string): Promise<User | null> {
    return this.userService.findOneByEmail(email);
  }
}
