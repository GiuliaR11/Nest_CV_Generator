import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CV } from './cv.schema';

@Injectable()
export class CvService {
  constructor(@InjectModel('Cv') private cvModel: Model<any>) {}

  async findAll(): Promise<CV[]> {
    return this.cvModel.find().exec();
  }

  async findOne(id: string): Promise<CV> {
    return this.cvModel.findById(id).exec();
  }

  async create(createCVDto: CV): Promise<CV> {
    const createdCV = new this.cvModel(createCVDto);
    return createdCV.save();
  }

  async update(id: string, updateCVDto: CV): Promise<CV> {
    return this.cvModel
      .findByIdAndUpdate(id, updateCVDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<CV> {
    return this.cvModel.findByIdAndRemove(id).exec();
  }
}
