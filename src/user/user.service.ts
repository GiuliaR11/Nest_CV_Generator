import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/User';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['cvs'],
    });
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return (await this.usersRepository.find({ email })).at(0);
  }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const createdUser = new this.usersRepository(createUserDto);
  //   return createdUser.save();
  // }

  // async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   return this.userModel
  //     .findByIdAndUpdate(id, updateUserDto, { new: true })
  //     .exec();
  // }

  // async delete(id: string): Promise<User> {
  //   return this.userModel.findByIdAndRemove(id).exec();
  // }
}
