import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { LoginInterface } from '../../../shared/interfaces/login.interface';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/entitys/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { UserService } from '../../user/user.service';

describe('AppController (e2e)', () => {
  const app = 'http://localhost:3000';
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('Check a valid user login', () => {
    const loginData: LoginInterface = {
      username: 'maximosdrr',
      password: '123456',
    };
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(loginData)
      .expect(({ body }) => {
        expect(body.accessToken).toBeDefined();
      });
  });

  it('Check invalid user login', () => {
    const loginData: LoginInterface = {
      username: 'any',
      password: 'any',
    };

    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(loginData)
      .expect(({ body }) => {
        expect(body.accessToken).toBeUndefined();
        expect(401);
      });
  });

  it('Check login flow for a valid user token', () => {
    const loginData: LoginInterface = {
      username: 'maximosdrr',
      password: 'password',
    };

    let accessToken = '';

    request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(loginData)
      .expect(({ body }) => {
        accessToken = body.accessToken;
        expect(body.accessToken).toBeUndefined();
        expect(accessToken).toBeDefined();
        expect(201);
      });

    request(app)
      .get('/auth/decodeUserToken')
      .set('x-access-token', accessToken)
      .expect(({ body }) => {
        expect(body.id).toBeDefined();
        expect(body.accessLevel).toBeDefined();
        expect(200);
      });
  });

  it('Check login flow for a valid user token', () => {
    request(app)
      .get('/auth/decodeUserToken')
      .set('x-access-token', 'random-token-provided')
      .expect(({ body }) => {
        expect(body.id).toBeUndefined();
        expect(body.accessLevel).toBeUndefined();
        expect(401);
      });
  });
});
