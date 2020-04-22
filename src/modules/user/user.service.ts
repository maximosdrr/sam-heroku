import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitys/user.entity';
import { Repository, InsertResult } from 'typeorm';
import { LoginInterface } from './interfaces/login.interface';
import { UpdateUserData } from './interfaces/user-update-data.interface';
import { SqlErro } from './interfaces/sql-erro.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  onSqlErro(erro) {
    const sqlErro: SqlErro = {
      name: erro.name,
      code: erro.code,
      errno: erro.errno,
    };
    return sqlErro;
  }

  async insert(user: User): Promise<any> {
    return await this.userRepository.insert(user).catch(this.onSqlErro);
  }

  async login(loginData: LoginInterface): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { username: loginData.username, password: loginData.password },
    });
    return user;
  }

  async update(userUpdateData: UpdateUserData): Promise<any> {
    const user: User = await this.userRepository.findOne(userUpdateData.id);
    user.name = userUpdateData.name;
    return await this.userRepository.save(user).catch(this.onSqlErro);
  }

  async delete(id: string): Promise<any> {
    return await this.userRepository.delete(id).catch(this.onSqlErro);
  }
  // async updateUser();
}
