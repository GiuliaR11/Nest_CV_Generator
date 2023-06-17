import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CvService } from './cv.service';
import { CV } from './cv.schema';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  // @Post()
  // async create(@Body() createUserDto: CV) {
  //   await this.cvService.create(createUserDto);
  // }
  // @Get()
  // async findAll(): Promise<CV[]> {
  //   return this.cvService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<CV> {
  //   return this.cvService.findOne(id);
  // }
}
