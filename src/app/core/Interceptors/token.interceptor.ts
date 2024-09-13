import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Authentication/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authservice:AuthService) {}

  clonedRequest!: HttpRequest<any>;
  Access_Token: string = window.localStorage.getItem('token')!;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    if (this.Access_Token) {
      this.clonedRequest = request.clone({
        setHeaders: {
          Authorization: `bearer ${this.Access_Token}`,
        },
      });
    return next.handle(this.clonedRequest);


    }else {
    return next.handle(request);
    }

  }
}
