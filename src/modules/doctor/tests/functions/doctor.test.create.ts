import * as request from 'supertest';
import { LoginInterface } from 'src/modules/user/interfaces/login.interface';

export class CreateDoctor {
  app: string;
  constructor() {
    this.app = 'http://localhost:3000';
  }

  async userLogin(): Promise<string> {
    let validAuthToken: string;
    const loginData: LoginInterface = {
      username: 'maximosdrr',
      password: '123456',
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

  createDoctorWithRandomCMR(validAuthToken: string) {
    const doctor: object = {
      name: 'Doctor 1',
      cmr: Math.random().toString(),
      specialty: 'Speacialty',
    };

    return request(this.app)
      .post('/doctor/insert')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validAuthToken}`)
      .send(doctor)
      .expect(201)
      .expect(({ body }) => {
        expect(body.identifiers[0].id).toBeDefined();
        expect(body.generatedMaps).toBeDefined();
        expect(body.raw.affectedRows).toEqual(1);
      });
  }
}
