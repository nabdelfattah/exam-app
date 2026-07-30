import { Component } from '@angular/core';
import { BreadcrumbRouterDemo } from '@/app/shared/components/breadcrumb/breadcrumb.component';
import { TitleComponent } from '@/app/shared/components/title/title.component';

@Component({
  selector: 'app-diplomas',
  imports: [BreadcrumbRouterDemo, TitleComponent],
  templateUrl: './diplomas.component.html',
})
export class DiplomasComponent {
  items = [{ label: 'Diplomas', routerLink: '/diplomas' }];
}
