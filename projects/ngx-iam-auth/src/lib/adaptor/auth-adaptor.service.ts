import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor.interface';
import { LoginRes, LoginRowRes } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthAdaptorService implements Adaptor {
  adapt(data: LoginRowRes): LoginRes {
    const { user, token } = data.payload;
    return {
      username: user.username,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePhoto: user.profilePhoto,
      role: user.role,
      token,
    };
  }
}
