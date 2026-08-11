import { Component, computed, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.html',
})
export class Button {
  label = input<string>('');
  type = input<'submit' | 'button'>('button');
  variant = input<'primary' | 'secondary' | 'outline' | 'link' | 'danger' | 'red' | 'gray'>(
    'primary',
  );
  size = input<'sm' | 'md'>('md');
  // capture the external class="" passed on <app-button class="...">
  class = input<string>('', { alias: 'class' });

  buttonClass = computed(() => {
    const base =
      'w-full rounded-none py-3.5 flex items-center justify-center gap-2 transition duration-300';
    let variantClass: string;

    if (this.variant() === 'primary') {
      variantClass = `${base} bg-primary text-white hover:bg-primary-dark`;
    } else if (this.variant() === 'outline') {
      variantClass = `${base} bg-blue-50 border border-primary text-black hover:bg-blue-100`;
    } else if (this.variant() === 'link') {
      variantClass = `font-geist font-medium text-sm text-primary hover:underline transition duration-300 p-0 bg-transparent border-none`;
    } else if (this.variant() === 'danger') {
      variantClass = `py-3.5 font-geist font-medium text-sm bg-red-50 text-red-600 border border-red-50 hover:border-current rounded-none w-full h-full hover:border`;
    } else if (this.variant() === 'red') {
      variantClass = `py-3.5 font-geist font-medium text-sm bg-red-600 text-white rounded-none w-full h-full hover:bg-red-700`;
    } else if (this.variant() === 'gray') {
      variantClass = `bg-gray-200 hover:bg-gray-50 text-black transition duration-300 py-3.5 justify-center w-full font-geist rounded-none border-0`;
    } else {
      variantClass = base;
    }

    // append/override with whatever the consumer passed in
    return `${variantClass} ${this.class()}`.trim();
  });
}
