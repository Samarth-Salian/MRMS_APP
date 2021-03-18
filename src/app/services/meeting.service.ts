import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message:any){
    this.toastr.success(message)
  }

  showError(message:any, title:any){
      this.toastr.error(message, title)
  }

}
