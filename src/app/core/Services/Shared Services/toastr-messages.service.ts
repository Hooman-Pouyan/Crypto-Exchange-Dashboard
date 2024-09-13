import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrMessagesService {
  constructor(private toast: ToastrService) {}

  showSuccess(message: string, title?: string, timeout?: number) {
    this.toast.success(message, title, {
      positionClass: 'toast-bottom-center',
      enableHtml: true,
      closeButton: false,
      onActivateTick: true,
      timeOut: timeout || 3000,
      progressBar: true,
    });
  }

  showInfo(message: string, title?: string, timeout?: number) {
    this.toast.info(message, title, {
      positionClass: 'toast-bottom-center',
      enableHtml: true,
      closeButton: false,
      onActivateTick: true,
      timeOut: timeout || 3000,
      progressBar: true,
    });
  }

  showWarning(message: string, title?: string, timeout?: number) {
    this.toast.warning(message, title, {
      positionClass: 'toast-bottom-center',
      enableHtml: true,
      closeButton: false,
      onActivateTick: true,
      timeOut: timeout || 3000,
      progressBar: true,
    });
  }

  showError(message: string, title?: string, timeout?: number) {
    this.toast.error(message, title, {
      positionClass: 'toast-bottom-center',
      enableHtml: true,
      closeButton: false,
      onActivateTick: true,
      timeOut: timeout || 3000,
      progressBar: true,
    });
  }
}
