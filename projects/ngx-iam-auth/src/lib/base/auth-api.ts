import { Observable } from 'rxjs';

export default abstract class AuthApi {
  abstract register(data: any): Observable<any>;
  abstract login(data: any): Observable<any>;
  abstract verifyEmail(data: any): Observable<any>;
  abstract confirmEmail(data: any): Observable<any>;
  abstract forgetPassword(data: any): Observable<any>;
  abstract resetPassword(data: any): Observable<any>;
}
