import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserServices } from '../../services/user.service';
import { AppComponent } from '../../app.component';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  adminMsg: string = "This  user updated to Admin role";
  userMsg: string = "This user updated to User role";
  constructor(public http: HttpClient, public snackBar: SnackbarService, private activatedRoute: ActivatedRoute, private titleChange: AppComponent) {
    this.titleChange.title = this.activatedRoute.snapshot.data['title'];
    this.titleChange.setTitle(this.titleChange.title);
    this.titleChange.showFabIcon = false;
    this.getjson().subscribe(data => {
      this.users = data;
    });
  }

  ngOnInit(): void {
  }
  public getjson(): Observable<any> {
    return this.http.get("assets/userList.json").pipe()
  }
  getAdminMsg() {
    this.snackBar.openSnackBar(this.adminMsg, '');
  }
  getUserMsg() {
    this.snackBar.openSnackBar(this.userMsg, '');
  }
}
