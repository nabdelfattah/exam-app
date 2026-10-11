import { InjectionToken } from '@angular/core';

export interface IamAuthConfig {
  baseUrl: string;
}

export const IAM_AUTH_CONFIG = new InjectionToken<IamAuthConfig>('IAM_AUTH_CONFIG');

export function provideIamAuth(config: IamAuthConfig) {
  return [{ provide: IAM_AUTH_CONFIG, useValue: config }];
}
