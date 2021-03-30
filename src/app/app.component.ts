import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
declare let window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showProfileImage: boolean = true;

  user: any;

  backButtonScreenName: string = '';

  roomListBackButton: boolean = true;

  title = 'Meeting-App';

  displayHeading = true;

  showFabIcon = true;

  screenName;

  roomLaunchFlag = 'Root Menu';

  routerPath: string = window.location.href.split('/', 4)[3];
  tableName: string = '';
  loginCredentials: Object;
  db: any;
  loginStorage: any;

  constructor(private zone: NgZone,public http: HttpClient, private location: Location, private router: Router) {
    document.addEventListener("deviceready",()=> {
      debugger;
      this.zone.run(() => {
      if (window.cordova && window.SQLitePlugin) {
        this.db = window.sqlitePlugin.openDatabase({
          name: 'my.db',
          location: 'default',
          androidDatabaseProvider: 'system'
        });
        this.retrieveLoginData('root');
        //To Create Table
      } else {
        //browser related goes here.
        this.retriveBrowserData();
      }
    })
  },false);
    this.loginCredentials = {};
    this.tableName = 'login_table';
    if (this.routerPath === 'meeting-details' || this.routerPath === 'room-list' || this.routerPath === 'room-search') {
      this.displayHeading = false;
      this.screenName = this.routerPath.replace('-', ' ');
    }
  }
  setImage(param: string) {
    this.user = {};
    this.user.image = param;
  }
  setTitle = (param: string) => {
    if (param == undefined) {
      this.displayHeading = true;
      this.title = 'Meeting-App';
    } else {
      this.displayHeading = false;
      this.title = param;
    }
  }

  public getjson(): Observable<any> {
    return this.http.get('assets/userList.json').pipe();
  }

  goBack = () => {
    this.showProfileImage = true;

    const path = window.location.href.split('/', 4)[3];

    const sidebarRequired = ['room-details', 'room-list'];
    if (sidebarRequired.includes(path) && this.roomListBackButton) {
      if (path === 'room-details') {
        this.router.navigateByUrl('/room-list', { state: { data: 'Root Menu' } });
      } else {
        if (this.backButtonScreenName === 'signin') {
          this.router.navigateByUrl('/signin');
        } else {
          this.router.navigateByUrl('/my-meetings');
        }
      }
    } else {
      this.location.back();
    }
  }

  fnNavigateRoomList(): void {
    this.showFabIcon = true;
    this.router.navigateByUrl('/room-list', { state: { data: this.roomLaunchFlag } });
  }
  createLoginTable(param: string) {
    this.db.transaction((tx: any) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' + this.tableName + ' (emailId text primary key, firstName text, lastName text, profilePic text,jwtToken text)');
      this.router.navigateByUrl('/signin');
    });
  }
  //To Insert Data
  insertLoginData(param: any) {
    this.db.transaction((tx: any) => {
      let loginArr = [param.email, param.firstName, param.lastName, param.photoUrl, ""];
      tx.executeSql('INSERT INTO ' + this.tableName + '  VALUES (?,?,?,?,?)', loginArr);
    }, function (error: any) {
      console.log('Transaction ERROR: ' + error.message);
    }, () => {
      this.retrieveLoginData('root');
      console.log('Populated database OK');
    });
  }
  //To Retreive Data
  retrieveLoginData(param: string) {
    let data = param;
    this.db.transaction((tx: any) => {
      tx.executeSql('SELECT * FROM ' + this.tableName, [], (tx: any, rs: any) => {
        if (rs.rows.length === 0) {
          this.router.navigateByUrl('/signin');
        } else {
          this.loginCredentials = rs.rows.item(0);
          this.router.navigateByUrl('/my-meetings', { state: { data: this.loginCredentials } });
        }
      }, (tx: any, error: any) => {
        if (error.message.split(':')[0] === "no such table" || error.message.split(':')[1].trim() === "no such table") {
          this.createLoginTable(data);
        }
      });
    });
  }
  retriveBrowserData() {
    this.loginStorage = window.localStorage;
    if (!this.loginStorage.getItem(this.tableName)) {
      this.router.navigateByUrl('/signin');
    } else {
      this.loginCredentials = JSON.parse(this.loginStorage.getItem(this.tableName));
      this.router.navigateByUrl('/my-meetings', { state: { data: this.loginCredentials } });
    }
  }
}
