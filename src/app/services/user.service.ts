import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserServices {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: any): void {
    this.toastr.success(message);
  }

  showError(message: any, title: any): void {
    this.toastr.error(message, title);
  }
}
