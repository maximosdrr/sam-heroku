import * as request from 'supertest';
import { LoginInterface } from '../interfaces/login.interface';
import { HttpStatus } from '@nestjs/common';

export class CommonTests {
  app: string;
  username: string;
  password: string;
  route: string;

  constructor(route = '') {
    this.app = 'http://localhost:3000';
    this.username = 'maximosdrr';
    this.password = '123456';
    this.route = route;
  }

  async userLogin(): Promise<string> {
    let validAuthToken: string;
    const loginData: LoginInterface = {
      username: this.username,
      password: this.password,
    };

    await request(this.app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(loginData)
      .expect(({ body }) => {
        expect(body.accessToken).toBeDefined();
        validAuthToken = body.accessToken;
      });

    return validAuthToken;
  }

  async validCreationForActionUsingId(
    validAuthToken: string,
    validData: object,
  ): Promise<string> {
    let id: string;
    await request(this.app)
      .post(`/${this.route}/insert`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validAuthToken}`)
      .send(validData)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        id = body.identifiers[0].id;
      });
    return id;
  }

  validCreation(validAuthToken: string, validData: object) {
    return request(this.app)
      .post(`/${this.route}/insert`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validAuthToken}`)
      .send(validData)

      .expect(({ body }) => {
        expect(body.identifiers[0].id).toBeDefined();
        expect(body.generatedMaps).toBeDefined();
        expect(body.raw.affectedRows).toEqual(1);
      })
      .expect(HttpStatus.CREATED);
  }

  invalidCreation(validAuthToken: string, invalidData: object) {
    return request(this.app)
      .post(`/${this.route}/insert`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validAuthToken}`)
      .send(invalidData)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(({ body }) => {
        expect(body.message).toBeDefined();
        expect(HttpStatus.BAD_REQUEST);
      });
  }

  async validDelete(validAuthToken: string, data: object) {
    const id: string = await this.validCreationForActionUsingId(
      validAuthToken,
      data,
    );
    return request(this.app)
      .delete(`/${this.route}/delete?id=${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validAuthToken}`)
      .expect(({ body }) => {
        expect(body.raw).toBeDefined();
        expect(body.raw.affectedRows).toEqual(1);
        expect(HttpStatus.CREATED);
      });
  }

  async invalidDelete(validAuthToken: string) {
    return request(this.app)
      .delete(`/${this.route}/delete?id=someInvalidId`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validAuthToken}`)
      .expect(({ body }) => {
        expect(body.raw).toBeDefined();
        expect(body.raw.affectedRows).toEqual(0);
        expect(HttpStatus.CREATED);
      });
  }

  async validFindSomeOneById(validAuthToken: string, data: object) {
    const id: string = await this.validCreationForActionUsingId(
      validAuthToken,
      data,
    );
    return request(this.app)
      .get(`/${this.route}/findOneById/?id=${id}`)
      .set('Authorization', `Bearer ${validAuthToken}`)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(HttpStatus.CREATED);
      });
  }

  async invalidFindSomeOneById(validAuthToken: string) {
    return request(this.app)
      .get(`/${this.route}/findOneById/?id=someInvalidId`)
      .set('Authorization', `Bearer ${validAuthToken}`)
      .expect(({ body }) => {
        expect(body.message).toBeDefined();
        expect(HttpStatus.NOT_FOUND);
      });
  }

  async validFindAll(validAuthToken: string) {
    return request(this.app)
      .get(`/${this.route}/findAll/?limit=0&page=0`)
      .set('Authorization', `Bearer ${validAuthToken}`)
      .expect(({ body }) => {
        expect(body.length).toBeDefined();
        expect(body.length).toBeGreaterThanOrEqual(0);
        expect(body).toBeDefined();
        expect(HttpStatus.CREATED);
      });
  }

  async invalidFindAll(validAuthToken: string) {
    return request(this.app)
      .get(`/${this.route}/findAll`)
      .set('Authorization', `Bearer ${validAuthToken}`)
      .expect(({ body }) => {
        expect(body.message).toBeDefined();
        expect(HttpStatus.BAD_REQUEST);
      });
  }

  async validUpdate(
    validAuthToken: string,
    data: object,
    dataToUpdate: object,
  ) {
    const id: string = await this.validCreationForActionUsingId(
      validAuthToken,
      dataToUpdate,
    );

    data['id'] = id;
    return request(this.app)
      .put(`/${this.route}/update`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validAuthToken}`)
      .send(data)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(body).toEqual(data);
        expect(HttpStatus.CREATED);
      });
  }

  async invalidSomeoneIdUpdate(validAuthToken: string, data: object) {
    return request(this.app)
      .put(`/${this.route}/update`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validAuthToken}`)
      .send(data)
      .expect(({ body }) => {
        expect(body.message).toBeDefined();
        expect(HttpStatus.NOT_FOUND);
      });
  }
}
