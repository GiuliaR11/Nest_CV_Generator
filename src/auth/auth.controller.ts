import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';
import { Response } from 'express';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() signInDto: LoginDto, @Res() res: Response) {
    const authorization = await this.authService.signIn(signInDto);

    if (!authorization) {
      throw new UnauthorizedException();
    }

    return res
      .status(HttpStatus.OK)
      .header({
        authorization,
        'Access-Control-Expose-Headers': 'Authorization',
      })
      .json({});
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@Request() req: any) {
    return this.authService.getProfile(req.tokenPayload.sub);
  }
}
