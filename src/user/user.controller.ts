import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CvService } from 'src/cv/cv.service';
import { CV } from 'src/cv/cv.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cvService: CvService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return (await this.userService.findAll()).find(
      (user) => user.email === email,
    );
  }

  @Get(':id/cvs')
  async findAllByUser(@Param('id') id: string): Promise<CV[]> {
    return this.cvService.findCVsByUser(id);
  }
}
