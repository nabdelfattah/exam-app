import { Component, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbRouterDemo } from '@/app/shared/components/breadcrumb/breadcrumb.component';
import { TitleComponent } from '@/app/shared/components/title/title.component';
import { DiplomasService } from '@app/features/dashboard/infrastructure/diplomas.service';
import { Diploma } from '@app/features/dashboard/domain/diploma.interface';
import { DiplomaCardComponent } from '@app/features/dashboard/presentation/diploma-card/diploma-card.component';

@Component({
  selector: 'app-diplomas',
  imports: [BreadcrumbRouterDemo, TitleComponent, DiplomaCardComponent],
  templateUrl: './diplomas.component.html',
})
export class DiplomasComponent implements OnInit {
  private readonly diplomaService = inject(DiplomasService);
  diplomasList = signal<Diploma[]>([]);

  items = [{ label: 'Diplomas', routerLink: '/dashboard/diplomas' }];

  ngOnInit() {
    this.diplomaService.getDiplomas().subscribe({
      next: (res) => {
        console.log(res);
        this.diplomasList.set(res);
      },
      error: () => {},
    });
  }
}
