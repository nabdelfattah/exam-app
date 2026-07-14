import { Component } from '@angular/core';
import { AuthTexTBox } from '../../../features/auth';
import { RouterOutlet } from '../../../../../node_modules/@angular/router/types/_router_module-chunk';

@Component({
  selector: 'app-auth-layout',
  imports: [AuthTexTBox, RouterOutlet],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
