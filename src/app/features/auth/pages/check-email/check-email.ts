import { Component, inject } from '@angular/core';
import { Link } from '@/app/shared/components';
import { Location } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { AuthFlowService } from '../../services/auth-flow-service';

@Component({
  selector: 'app-check-email',
  imports: [Link, ButtonDirective],
  templateUrl: './check-email.html',
})
export class CheckEmail {
  private readonly location = inject(Location);
  private readonly authFlowService = inject(AuthFlowService);

  email = this.authFlowService.email;

  navigateHandler() {
    this.location.back();
  }
}
