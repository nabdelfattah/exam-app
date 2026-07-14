import { Component } from '@angular/core';
import { AuthTextBox } from '@app/features/auth';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [AuthTextBox, RouterOutlet],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
