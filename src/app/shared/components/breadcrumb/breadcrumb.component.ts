import { Component, input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  standalone: true,
  imports: [Breadcrumb, RouterModule],
})
export class BreadcrumbRouterDemo {
  items = input<MenuItem[] | undefined>();
}
