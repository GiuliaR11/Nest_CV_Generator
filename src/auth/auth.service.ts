import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user?.email };
    return {
      statusCode: 200,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
