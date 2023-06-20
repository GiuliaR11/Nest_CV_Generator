import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CV } from './cv.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

@ApiTags('cv')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cv')
export class CvController {
  constructor(
    private readonly cvService: CvService,
    private readonly usersService: UserService,
  ) {}

  @Post()
  async upsert(@Request() req: any, @Body() createCvDto: CV) {
    const user = await this.usersService.findByEmail(req.tokenPayload.sub);
    const cv = {
      ...createCvDto,
      user,
    };
    return this.cvService.upsert(cv);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CV> {
    return this.cvService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.cvService.delete(id);
  }
}
