import { Component,NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare let window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showProfileImage: boolean = true;

  showWelcomeMessage: boolean;

  user: any;

  backButtonScreenName: string = '';

  roomListBackButton: boolean = true;

  title = 'Meeting-App';

  displayHeading = 'show';

  showFabIcon = true;

  screenName;

  roomLaunchFlag = 'Root Menu';

  routerPath: string = window.location.href.split('/', 4)[3];
  tableName: string = '';
  loginCredentials: any;
  db: any;
  loginStorage: any;

  constructor(private zone: NgZone, public http: HttpClient, private location: Location, private router: Router) {
    this.tableName = 'login_table';
    this.loginCredentials = {};
    this.showWelcomeMessage = true;
    document.addEventListener("deviceready", () => {
      this.zone.run(() => {
        if (window.cordova && window.cordova.platformId !== 'browser') {
          this.db = window.sqlitePlugin.openDatabase({
            name: 'my.db',
            location: 'default',
            androidDatabaseProvider: 'system'
          });
          this.retrieveLoginData('root');
        } 
      })
    }, false);
    if (!window.cordova || window.cordova.platformId === 'browser') {
      this.retriveBrowserData();
    }
    if (this.routerPath === 'meeting-details' || this.routerPath === 'room-list' || this.routerPath === 'room-search') {
      this.displayHeading = 'hide';
      this.screenName = this.routerPath.replace('-', ' ');
    }
  }
  setImage(param: string) {
    this.user = {};
    this.user.profilePic = param;
  }
  setTitle = (param: string) => {
    if (param === '') {
      this.displayHeading = 'show';
      this.title = 'Meeting-App';
    }
    else if (param === 'signin') {
      this.displayHeading = '';
      this.title = 'Meeting-App';
    } else {
      this.displayHeading = 'hide';
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
        this.zone.run(() => { this.router.navigateByUrl('/room-list', { state: { data: 'Root Menu' } }) });
      } else {
        if (this.backButtonScreenName === 'signin') {
          this.zone.run(() => { this.router.navigateByUrl('/signin') });
        } else {
          this.zone.run(() => { this.router.navigateByUrl('/my-meetings') });
        }
      }
    } else if (path === "location-list") {
      this.zone.run(() => { this.router.navigateByUrl('/my-meetings') });
    } else {
      this.zone.run(() => this.location.back());
    }
  }

  fnNavigateRoomList(): void {
    this.showFabIcon = true;
    this.zone.run(() => { this.router.navigateByUrl('/room-list', { state: { data: this.roomLaunchFlag } }) });
  }

  validateSeatNum(event: any) {
    const count = Number((<HTMLInputElement>document.getElementById('mynum')).value);

    const submitBtnId = (<HTMLInputElement>document.getElementById('submitbtn'));

    if (count === 0) {
      submitBtnId.disabled = true;
      submitBtnId.classList.add('mat-button-disabled');
    } else {
      submitBtnId.disabled = false;
      submitBtnId.classList.remove('mat-button-disabled');
    }
  }
  createLoginTable(param: string) {
    this.db.transaction((tx: any) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' + this.tableName + ' (emailId text primary key, displayName text, profilePic text,jwtToken text)');
      this.zone.run(() => { this.router.navigateByUrl('/signin') });
    });
  }
  //To Insert Data
  insertLoginData(param: any) {
    this.setImage(param?.imageUrl);
    this.db.transaction((tx: any) => {
      let loginArr = [param.email, param.displayName, param.imageUrl, ""];
      tx.executeSql('INSERT INTO ' + this.tableName + '  VALUES (?,?,?,?)', loginArr);
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
    this.db.transaction((fetchTx: any) => {
      fetchTx.executeSql('SELECT * FROM ' + this.tableName, [], (resTx: any, rs: any) => {
        if (rs.rows.length === 0) {
          this.zone.run(() => { this.router.navigateByUrl('/signin') });
        } else {
          this.loginCredentials = rs.rows.item(0);
          this.zone.run(() => { this.router.navigateByUrl('/my-meetings', { state: { data: this.loginCredentials } }) });
        }
      }, (errorTx: any, error: any) => {
        if (error.message.split(':')[0] === "no such table" || error.message.split(':')[1].trim() === "no such table") {
          this.createLoginTable(data);
        }
      });
    });
  }
  retriveBrowserData() {
    this.loginStorage = window.localStorage;
    if (!this.loginStorage.getItem(this.tableName)) {
      this.zone.run(() => { this.router.navigateByUrl('/signin') });
    } else {
      this.loginCredentials = JSON.parse(this.loginStorage.getItem(this.tableName));
      this.setImage(this.loginCredentials?.imageUrl);
      this.zone.run(() => { this.router.navigateByUrl('/my-meetings', { state: { data: this.loginCredentials } }) });
    }
  }
}
