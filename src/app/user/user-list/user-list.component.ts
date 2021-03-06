import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: any;

  adminMsg: string = 'This  user updated to Admin role';

  userMsg: string = 'This user updated to User role';
  showSkeletion: boolean = false;
  constructor(public http: HttpClient, public toastController: ToastController,
    private activatedRoute: ActivatedRoute, private titleChange: AppComponent) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.titleChange.showFabIcon = false;
    this.getjson().subscribe(data => {
      this.users = data;
    });
    setTimeout(() => {
      this.showSkeletion = true;
    }, 3000);
  }

  public getjson(): Observable<any> {
    return this.http.get('assets/userList.json').pipe();
  }
  getAdminMsg() {
    this.titleChange.presentToast(this.adminMsg);
  }

  getUserMsg() {
    this.titleChange.presentToast(this.userMsg);
  }
}
