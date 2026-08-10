import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbRouterDemo } from '@/app/shared/components/breadcrumb/breadcrumb.component';
import { TitleComponent } from '@/app/shared/components/title/title.component';
import { DiplomasService } from '@app/features/dashboard/infrastructure/diplomas.service';
import { Diploma } from '@app/features/dashboard/domain/diploma.interface';
import { DiplomaCardComponent } from '@app/features/dashboard/presentation/diploma-card/diploma-card.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-diplomas',
  imports: [BreadcrumbRouterDemo, TitleComponent, DiplomaCardComponent, EmptyStateComponent],
  templateUrl: './diplomas.component.html',
})
export class DiplomasComponent implements OnInit {
  private readonly diplomaService = inject(DiplomasService);
  private readonly destroyRef = inject(DestroyRef);

  diplomasList = signal<Diploma[]>([]);

  items = [{ label: 'Diplomas', routerLink: '/diplomas' }];

  ngOnInit() {
    this.getDiplomas();
  }

  getDiplomas() {
    this.diplomaService
      .getDiplomas()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.diplomasList.set(res);
        },
        error: () => {},
      });
  }
}
