import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ServiceConfigsService } from '../Services/Shared Services/ServiceConfigs.service';
import { ToastrMessagesService } from '../Services/Shared Services/toastr-messages.service';
import { Params, Router } from '@angular/router';

@Injectable()
export class ErrorhandleInterceptor implements HttpInterceptor {
  constructor(
    private toast: ToastrMessagesService,
    private servicconfigs: ServiceConfigsService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError(err => {
        this.handleHttpError(err);
        return throwError(err);
      })
    );
  }

  handleHttpError(error: HttpErrorResponse, showError: boolean = true) {
    let message = '';
    if (error.error.message != null) {
      message = error.error.message.error;
    }

    switch (error.status) {
      case 0:
        if (message == '') this.toast.showError('error connection');
        break;
      case 401:
        this.toast.showError('ابتدا وارد شوید')
        this.servicconfigs.removeAuth();
        const queryParams: Params =
          this.router.url !== '/Login' ? { backurl: this.router.url } : {};
        this.router.navigate(['/Login'], {
          queryParams: queryParams,
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
        this.toast.showError(message);
        return;
      case 403:
        this.toast.showError(message);
        return;
      case 422:
        this.toast.showError('اطلاعات وارد شده صحیح نمیباشد');
    }

    if (showError && message !== '') this.toast.showError(message);
  }
}
