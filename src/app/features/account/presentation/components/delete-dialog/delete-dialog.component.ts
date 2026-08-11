import { Router } from '@angular/router';
import { Component, inject, model } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from '@/app/shared/components';
import { AccountService } from '../../../infrastructure/account.service';

@Component({
  selector: 'app-delete-dialog',
  imports: [Dialog, Button],
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);

  visible = model<boolean>(true);

  closeDialogHandler() {
    this.visible.set(false);
  }

  DeleteAccountHandler() {
    this.accountService.deleteAccount().subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: () => {
        // handled globally via error interceptor
      },
    });
  }
}
