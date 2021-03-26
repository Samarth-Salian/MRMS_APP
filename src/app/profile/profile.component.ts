import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
declare let window: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any;

  appName = '';

  locations = ['Select', 'Building A, Bangalore', 'Building B, Bangalore', 'Building C, Bangalore'];

  constructor(public http: HttpClient, private titleChange: AppComponent,
    private activatedRoute: ActivatedRoute, private authService: SocialAuthService, private router: Router) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.titleChange.showProfileImage = false;
    this.user = this.titleChange.loginCredentials;
  }

  public getjson(): Observable<any> {
    return this.http.get('assets/userList.json').pipe();
  }

  public clickUpdate() {
    this.titleChange.goBack();
  }
  signOut(): void {
    this.titleChange.loginCredentials = '';
    this.deleteLoginTable();
  }
  //Delete scenario
  deleteLoginTable() {
    if (window.cordova && window.SQLitePlugin) {
      /*let db = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default',
        androidDatabaseProvider: 'system'
      });*/
      this.titleChange.db.transaction((tx: any) => {
        this.authService.signOut();
        tx.executeSql('DROP TABLE IF EXISTS ' + this.titleChange.tableName);
        this.router.navigateByUrl('/signin');
        //signout code goes here
      });
    } else {
      this.authService.signOut();
      this.titleChange.loginStorage.removeItem(this.titleChange.tableName);
      this.router.navigateByUrl('/signin');
    }
  }
}
