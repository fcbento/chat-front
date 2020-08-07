import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  success() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  userOn(name: string) {
    this.toastr.success(`${name} is on`)
  }

  error(message: string) {
    this.toastr.error(message)
  }
}
