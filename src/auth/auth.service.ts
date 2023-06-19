import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const user = await this.usersService.create(userDto);
    const payload = { sub: user?.email };

    return {
      statusCode: 201,
      user: {
        email: user.email,
      },
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signIn({ email, password }: LoginDto) {
    const user = await this.usersService.findWithPasswordByEmail(email);
    if (!user || user?.password !== password) {
      return null;
    }
    const payload = { sub: user?.email };
    return await this.jwtService.signAsync(payload);
  }

  async getProfile(email: string) {
    const user = await this.usersService.findByEmail(email);
    return user;
  }
}
