import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { userInfo } from 'os';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // generate hash
    const hash = await argon.hash(dto.password);

    // save the new user
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;

      // return the new user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    // if the user doesn't exist, throw an error
    if (!user) throw new ForbiddenException('Invalid credentials');

    // if the user exists, compare the password
    const valid = await argon.verify(user.hash, dto.password);

    // if the password is wrong, throw an error
    if (!valid) throw new ForbiddenException('Invalid credentials');

    // if the password is correct, return the user
    delete user.hash;
    return user;
  }
}
