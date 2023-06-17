import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

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
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user?.email };
    return await this.jwtService.signAsync(payload);
  }
}
