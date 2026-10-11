import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthFlowService {
  private readonly router = inject(Router);
  private _email = signal<string>('');
  email = this._email.asReadonly();

  setEmail(email: string) {
    this._email.set(email);
  }

  logout() {
    localStorage.removeItem('examToken');
    localStorage.removeItem('examUser');
    this.router.navigate(['/login']);
  }
}
