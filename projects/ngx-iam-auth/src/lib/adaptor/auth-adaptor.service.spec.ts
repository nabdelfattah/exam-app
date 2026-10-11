import { LoginRowRes } from '../interfaces/login.interface';
import { AuthAdaptorService } from './auth-adaptor.service';

describe('AuthAdaptorService', () => {
  let adaptor: AuthAdaptorService;

  beforeEach(() => {
    adaptor = new AuthAdaptorService(); // no need to test bed as there in no inject
  });

  it('maps the required fields and the token', () => {
    const serviceRes = {
      status: true,
      code: 1,
      payload: {
        user: {
          id: '124df',
          username: 'example',
          email: 'example@example.com',
          phone: '01111111111',
          firstName: 'Nada',
          lastName: 'Wael',
          gender: 'FEMALE',
          profilePhoto: 'https://app.com/sjfldsjflsdfjdsl',
          emailVerified: true,
          phoneVerified: true,
          role: 'USER',
          createdAt: '2026-10-11T11:32:33.526Z',
          updatedAt: '2026-10-11T11:32:33.526Z',
        },
        token: 'fkdsjflkdasjl;fjsadlkfja;kdlf',
      },
    };
    const adaptedRes = {
      username: 'example',
      email: 'example@example.com',
      phone: '01111111111',
      firstName: 'Nada',
      lastName: 'Wael',
      gender: 'FEMALE',
      profilePhoto: 'https://app.com/sjfldsjflsdfjdsl',
      role: 'USER',
      token: 'fkdsjflkdasjl;fjsadlkfja;kdlf',
    };
    const result = adaptor.adapt(serviceRes);
    expect(result).toEqual(adaptedRes);
  });
});
