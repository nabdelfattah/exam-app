import { Component } from '@angular/core';
import { AuthTexTBox } from '@app/features/auth';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [AuthTexTBox, RouterOutlet],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
