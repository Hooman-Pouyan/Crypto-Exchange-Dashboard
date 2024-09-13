import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {environment} from 'src/environments/environment';
import {ILoginRequest} from '../Models/ILogin';
import {ServiceConfigsService} from '../Services/Shared Services/ServiceConfigs.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private serviceconfigs: ServiceConfigsService,
    private router: Router) {
  }

  _isAuthenticated = signal<boolean>(false)
  _isLoggedIn = signal<boolean>(false)
  _Token = signal<string>(localStorage.getItem("token")!)

  logIn(loginData: ILoginRequest): Observable<any> {
    const headers = new HttpHeaders(this.serviceconfigs.getApiHeaders())
    return this.http.post<ILoginRequest>(environment.baseUrl + '/api/user/admin/auth/login', loginData, {headers: headers}).pipe(
    )
  }

  logOut() {
    this.serviceconfigs.removeAuth()
    this.router.navigate(["Login"])
  }

  sendConfirmEmail(confirmData: FormData): Observable<any> {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders());
    return this.http.post<any>(environment.baseUrl + "/api/user/admin/auth/two_step_email_send", confirmData, {headers: header}).pipe(
    )
  }


  acceptConfirmEmail(confirmData: FormData) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders());
    return this.http.post<any>(environment.baseUrl + "/api/user/admin/auth/two_step_email", confirmData, {headers: header}).pipe(
    )
  }

  acceptG2f(confirmData: FormData) {
    const header = new HttpHeaders(this.serviceconfigs.getApiHeaders());
    return this.http.post<any>(environment.baseUrl + "/api/user/admin/auth/two_step_g2f", confirmData, {headers: header}).pipe(
    )
  }


}
