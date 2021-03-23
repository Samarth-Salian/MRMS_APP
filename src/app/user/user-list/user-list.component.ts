import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServices } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  constructor(public http: HttpClient, public userService: UserServices) {
    this.getjson().subscribe(data => {
      this.users = data;
    });
  }

  adminMsg = 'This  user updated to Admin role';
  userMsg = 'this user updated to User role';


  ngOnInit(): void {
  }
  public getjson(): Observable<any> {
    return this.http.get('assets/userList.json').pipe();
  }
  getAdminMsg(): void {
    this.userService.showSuccess(this.adminMsg);
  }
  getUserMsg(): void {
    this.userService.showSuccess(this.userMsg);
  }

}
