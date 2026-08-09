import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthFlowService {
  private _email = signal<string>('');
  email = this._email.asReadonly();

  setEmail(email: string) {
    this._email.set(email);
  }
}
