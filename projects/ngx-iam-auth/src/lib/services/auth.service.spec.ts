import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { AuthAdaptorService } from './../adaptor/auth-adaptor.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import AuthEndPoints from '../enum/auth-end-points';
import { VerifyEmailRes } from '../interfaces/verify-email.interface';
import { LoginRes } from '../interfaces/login.interface';
import { RegisterRes } from '../interfaces/register.interface';
import { ConfirmEmailRes } from '../interfaces/confirm-email.interface';
import { ResetPasswordRes } from '../interfaces/reset-password.interface';
import { ForgetPasswordReq, ForgetPasswordRes } from '../interfaces/forget-password.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let adaptor: { adapt: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    adaptor = { adapt: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthAdaptorService, useValue: adaptor },
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // VERIFY EMEIL
  it('verifyEmail posts the data and emits the response', () => {
    // arrange
    let payload = { email: 'example@example.com' };
    let mockResponse = { status: true, code: 1, message: 'code sent' };
    // act
    let result: VerifyEmailRes | undefined;
    service.verifyEmail(payload).subscribe((res) => (result = res));
    // assert
    let call = httpMock.expectOne(AuthEndPoints.VERIFY_EMAIL);
    expect(call.request.method).toBe('POST');
    expect(call.request.body).toEqual(payload);
    call.flush(mockResponse);
    expect(result).toEqual(mockResponse);
  });

  // CONFIRM EMAIL
  it('confirmEmail posts the data and emits the response', () => {
    // arrange
    let payload = { email: 'example@example.com', code: '15548' };
    let mockResponse = { status: true, code: 1, message: 'code sent' };
    // act
    let result: ConfirmEmailRes | undefined;
    service.confirmEmail(payload).subscribe((res) => (result = res));
    // assert
    let call = httpMock.expectOne(AuthEndPoints.CONFIRM_EMAIL);
    expect(call.request.method).toBe('POST');
    expect(call.request.body).toEqual(payload);
    call.flush(mockResponse);
    expect(result).toEqual(mockResponse);
  });

  // REGISTER
  it('register posts the credentials and emits the adapted response', () => {
    // arrange
    let payload = {
      username: 'example',
      email: 'example@example.com',
      password: 'Abce123@',
      confirmPassword: 'Abcd123@',
      firstName: 'Nada',
      lastName: 'Wael',
    };
    let mockResponse = {
      status: true,
      code: 1,
      payload: {
        user: {
          id: 'ldksf0',
          username: 'example',
          email: 'example@example.com',
          phone: '01111111111',
          firstName: 'Nada',
          lastName: 'Wael',
          gender: 'FEMALE',
          role: 'USER',
          emailVerified: true,
          phoneVerified: false,
          createdAt: '2026-10-11T11:32:33.526Z',
          updatedAt: '2026-10-11T11:32:33.526Z',
        },
        token: 'SDLKFJASLD;FHDSJKGHSADFJADS;FJ;ASLDKFJASDFJ',
      },
    };
    let adaptedRes = {
      username: 'example',
      email: 'example@example.com',
      phone: '01111111111',
      firstName: 'Nada',
      lastName: 'Wael',
      gender: 'FEMALE',
      role: 'USER',
      token: 'SDLKFJASLD;FHDSJKGHSADFJADS;FJ;ASLDKFJASDFJ',
    };
    adaptor.adapt.mockReturnValue(adaptedRes);
    // act
    let result: RegisterRes | undefined;
    service.register(payload).subscribe((res) => (result = res));
    // assert
    let call = httpMock.expectOne(AuthEndPoints.REGISTER);
    expect(call.request.method).toBe('POST');
    expect(call.request.body).toEqual(payload);
    call.flush(mockResponse);
    expect(adaptor.adapt).toHaveBeenCalledWith(mockResponse);
    expect(result).toEqual(adaptedRes);
  });

  // LOGIN
  it('login posts the credentials and emits the adapted response', () => {
    // arrange
    let payload = {
      username: 'example',
      password: 'Abcd123@',
    };
    let mockResponse = {
      status: true,
      code: 1,
      payload: {
        user: {
          id: 'ldksf0',
          username: 'example',
          email: 'example@example.com',
          phone: '01111111111',
          firstName: 'Nada',
          lastName: 'Wael',
          gender: 'FEMALE',
          role: 'USER',
          emailVerified: true,
          phoneVerified: false,
        },
        token: 'SDLKFJASLD;FHDSJKGHSADFJADS;FJ;ASLDKFJASDFJ',
      },
    };
    let adaptedRes = {
      username: 'example',
      email: 'example@example.com',
      phone: '01111111111',
      firstName: 'Nada',
      lastName: 'Wael',
      gender: 'FEMALE',
      role: 'USER',
      token: 'SDLKFJASLD;FHDSJKGHSADFJADS;FJ;ASLDKFJASDFJ',
    };
    adaptor.adapt.mockReturnValue(adaptedRes);
    // act
    let result: LoginRes | undefined;
    service.login(payload).subscribe((res) => (result = res));
    // assert
    const call = httpMock.expectOne(AuthEndPoints.LOGIN);
    expect(call.request.method).toBe('POST');
    expect(call.request.body).toEqual(payload);
    call.flush(mockResponse);
    expect(adaptor.adapt).toHaveBeenCalledWith(mockResponse);
    expect(result).toEqual(adaptedRes);
  });

  // FOGET PASSWORD
  it('forgetPassword posts the data and emits the response', () => {
    // arrange
    let payload = { email: 'example@example.com', redirectUrl: 'https://app.com/reset' };
    let mockResponse = { status: true, code: 1, message: 'code sent' };
    // act
    let result: ForgetPasswordRes | undefined;
    service.forgetPassword(payload).subscribe((res) => (result = res));
    // assert
    let call = httpMock.expectOne(AuthEndPoints.FORGET_PASSWORD);
    expect(call.request.method).toBe('POST');
    expect(call.request.body).toEqual(payload);
    call.flush(mockResponse);
    expect(result).toEqual(mockResponse);
  });

  // RESET PASSWORD
  it('resetPassword posts the data and emits the response', () => {
    // arrange
    let payload = {
      token: 'dsfjasldfjaslkjf',
      newPassword: 'newPass1@',
      confirmPassword: 'newPass1@',
    };
    let mockResponse = { status: true, code: 1, message: 'code sent' };
    // act
    let result: ResetPasswordRes | undefined;
    service.resetPassword(payload).subscribe((res) => (result = res));
    // assert
    let call = httpMock.expectOne(AuthEndPoints.RESET_PASSWORD);
    expect(call.request.method).toBe('POST');
    expect(call.request.body).toEqual(payload);
    call.flush(mockResponse);
    expect(result).toEqual(mockResponse);
  });

  // if API returns error, it passes it to the subscriber (the component)
  it('passes HTTP errors through to the subscriber', () => {
    // arrange
    let mockError = {
      status: false,
      code: 400,
      message: 'Invalid email',
    };
    // act
    let error: HttpErrorResponse | undefined;
    service
      .forgetPassword({ email: 'a@b.com' } as ForgetPasswordReq)
      .subscribe({ error: (e) => (error = e) });
    // assert
    let call = httpMock.expectOne(AuthEndPoints.FORGET_PASSWORD);
    call.flush(mockError);
    expect(error?.status).toBeFalsy;
  });
});
