import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor.interface';
import { LoginRes } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthAdaptorService implements Adaptor {
  adapt(data: any): LoginRes {
    return {
      username: data.user.username,
      email: data.user.email,
      phone: data.user.phone,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      profilePhoto: data.user.profilePhoto,
      role: data.user.role,
      token: data.token,
    };
  }
}
