import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BEDBFF',
      300: '#8EC5FF',
      400: '#2B7FFF',
      500: '#155dfc', // base primary
      600: '#1447E6',
      700: '#193CB8',
      800: '#1C398E',
      900: '#162456',
      950: '#162456',
    },
  },
});
