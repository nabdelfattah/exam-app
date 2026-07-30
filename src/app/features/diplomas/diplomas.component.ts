import { Component } from '@angular/core';
import { BreadcrumbRouterDemo } from '@/app/shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-diplomas',
  imports: [BreadcrumbRouterDemo],
  templateUrl: './diplomas.component.html',
})
export class DiplomasComponent {
  items = [{ label: 'Diplomas', route: '/diplomas' }];
}
