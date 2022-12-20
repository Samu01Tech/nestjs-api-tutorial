import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  // /user/me
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
  // `@GetUser('email') email: string` returns email

  @Patch()
  editUser() {
    return 'edit user';
  }
}
