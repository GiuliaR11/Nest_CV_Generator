import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CV } from './cv.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('cv')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async upsert(@Body() createCvDto: CV) {
    return this.cvService.upsert(createCvDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CV> {
    return this.cvService.findOne(id);
  }
}
