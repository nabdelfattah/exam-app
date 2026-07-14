import { Component } from '@angular/core';
import { Logo } from '../../../../shared/components';

@Component({
  selector: 'app-auth-text-box',
  imports: [Logo],
  templateUrl: './auth-text-box.html',
})
export class AuthTextBox {
  data = [
    {
      icon: 'assets/icons/brain.svg',
      heading: 'Tailored Diplomas',
      description: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
    },
    {
      icon: '/assets/icons/book-open-check.svg',
      heading: 'Focused Exams',
      description: 'Access topic-specific tests including HTML, CSS, JavaScript, and more.',
    },
    {
      icon: '/assets/icons/rectangle-ellipsis.svg',
      heading: 'Smart Multi-Step Forms',
      description: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
    },
  ];
  item: any;
}
