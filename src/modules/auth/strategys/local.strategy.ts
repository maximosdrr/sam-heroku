import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginInterface } from '../../../shared/interfaces/login.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const loginData: LoginInterface = {
      username: username,
      password: password,
    };
    const user = await this.authService.validateUser(loginData);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
