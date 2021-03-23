import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private toastr: ToastrService, public snackBar: MatSnackBar) { }

  showSuccess(message: any): void {
    this.toastr.success(message);
  }

  showError(message: any, title: any): void {
    this.toastr.error(message, title);
  }
  fnShowMessage(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
