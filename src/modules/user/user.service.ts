import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitys/user.entity';
import { Repository, DeleteResult } from 'typeorm';
import { LoginInterface } from '../../shared/interfaces/login.interface';
import { UpdateUserData } from './interfaces/user-update-data.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async insert(user: User): Promise<any> {
    return await this.userRepository.insert(user).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }

  async login(loginData: LoginInterface): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { username: loginData.username, password: loginData.password },
    });
    return user;
  }

  async update(user: UpdateUserData): Promise<User> {
    const userToUpdate: User = await this.userRepository.findOne(user.id);
    if (!userToUpdate)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    user.name = user.name;
    return await this.userRepository.save(user).catch();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }
  // async updateUser();
}
