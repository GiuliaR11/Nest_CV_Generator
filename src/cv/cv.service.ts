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

  // async findAll(): Promise<CV[]> {
  //   return this.cvModel.find().exec();
  // }

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

  // async create(createCVDto: CV): Promise<CV> {
  //   const createdCV = new this.cvModel(createCVDto);
  //   return createdCV.save();
  // }

  // async update(id: string, updateCVDto: CV): Promise<CV> {
  //   return this.cvModel
  //     .findByIdAndUpdate(id, updateCVDto, { new: true })
  //     .exec();
  // }

  // async delete(id: string): Promise<CV> {
  //   return this.cvModel.findByIdAndRemove(id).exec();
  // }
}
