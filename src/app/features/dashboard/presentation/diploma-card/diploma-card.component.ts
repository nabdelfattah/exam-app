import { Component, input } from '@angular/core';
import { Diploma } from '@app/features/dashboard/domain/diploma.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-diploma-card',
  imports: [RouterLink],
  templateUrl: './diploma-card.component.html',
})
export class DiplomaCardComponent {
  data = input<Diploma>();
}
