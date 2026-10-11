import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor.interface';
import { LoginRes, LoginRowRes } from '../interfaces/login.interface';
import { RegisterRes, RegisterRowRes } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthAdaptorService implements Adaptor {
  adapt(data: LoginRowRes | RegisterRowRes): LoginRes | RegisterRes {
    const { user, token } = data.payload;
    return {
      username: user.username,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token,
      ...(user.profilePhoto && { profilePhoto: user.profilePhoto }),
      ...(user.gender && { gender: user.gender }),
    };
  }
}
