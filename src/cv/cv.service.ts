import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CV } from './cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CV)
    private cvsRepository: Repository<CV>,
  ) {}

  async findOne(id: string): Promise<CV> {
    return this.cvsRepository.findOne(id);
  }

  async findCVsByUser(userId: string): Promise<CV[]> {
    return this.cvsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async create(createCVDto: CV): Promise<CV> {
    const cv = this.cvsRepository.create(createCVDto);
    return await this.cvsRepository.save(cv);
  }

  async upsert(cvDto: CV): Promise<CV> {
    // console.log(cvDto)
    // const cv = cvDto.id ? this.cvsRepository.create(cvDto) : cvDto;
    return await this.cvsRepository.save(cvDto);
  }

  async delete(id: string): Promise<any> {
    const cv = await this.cvsRepository.findOne(id);
    await this.cvsRepository.remove(cv);
  }
}
