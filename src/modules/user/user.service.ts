import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitys/user.entity';
import { Repository, DeleteResult } from 'typeorm';
import { LoginInterface } from '../../shared/interfaces/login.interface';

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
    const user: User = await this.userRepository
      .findOne({
        where: { username: loginData.username, password: loginData.password },
      })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });
    return user;
  }

  async update(user): Promise<User> {
    const userToUpdate: User = await this.userRepository
      .findOne(user.id)
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });
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

  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user: User = await this.userRepository
      .findOne(id, { where: { password: oldPassword } })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    user.password = newPassword;

    return this.userRepository.save(user).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }

  async changeEmail(id: string, email: string): Promise<User> {
    const user: User = await this.userRepository.findOne(id).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    user.email = email;
    user.isChecked = false;
    return this.userRepository.save(user);
  }

  async confirmationEmail(id: string): Promise<User> {
    const user: User = await this.userRepository.findOne(id).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    user.isChecked = true;

    return this.userRepository.save(user);
  }

  async getProfile(id: string): Promise<object> {
    const user: User = await this.userRepository.findOne(id).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });

    return { email: user.email, name: user.name };
  }

  // async updateUser();
}
