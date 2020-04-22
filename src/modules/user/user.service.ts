import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitys/user.entity';
import { Repository, InsertResult } from 'typeorm';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async insert(user: User): Promise<InsertResult> {
    return await this.userRepository.insert(user);
  }

  async login(username: string, password: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { username: username, password: password },
    });
    return user;
  }

  async getToken(user: User): Promise<object> {
    if (!user) return { auth: false, token: null };
    const secret: string = process.env.JWTSECRET;
    const { id } = user;
    const token: string = sign({ id }, secret, { expiresIn: 3000000 });

    return { auth: true, token: token };
  }
}
