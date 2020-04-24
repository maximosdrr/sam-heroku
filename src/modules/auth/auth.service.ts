import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginInterface } from '../../shared/interfaces/login.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entitys/user.entity';
import { Payload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginData: LoginInterface): Promise<any> {
    const user = await this.userService.login(loginData);
    if (user) return user;
    return null;
  }

  async login(user: User): Promise<object> {
    const payload: Payload = { id: user.id, accessLevel: user.accessLevel };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
