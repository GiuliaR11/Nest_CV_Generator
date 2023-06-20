import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async findWithPasswordByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      select: ['password', 'email', 'id', 'firstName', 'lastName', 'id'],
      where: {
        email,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    console.log(user);
    return await this.usersRepository.save(user);
  }

  // async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   return this.userModel
  //     .findByIdAndUpdate(id, updateUserDto, { new: true })
  //     .exec();
  // }

  // async delete(id: string): Promise<User> {
  //   return this.userModel.findByIdAndRemove(id).exec();
  // }
}
