import { Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";


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

  showFilterIcon = true;

  screenName;

  roomLaunchFlag = 'Root Menu';
  firstLoad: boolean = true;
  routerPath: string = window.location.href.split('/', 4)[3];
  tableName: string = '';
  loginCredentials: any;
  db: any;
  loginStorage: any;
  spinnerObj: any;
  dark = false;
  showProfileImageIcon: boolean = true;
  constructor(private zone: NgZone, public http: HttpClient, private location: Location,
    private router: Router, private spinner: NgxSpinnerService, public navCtlr: NavController, public toastController: ToastController, private fcm: FCM) {
    this.spinnerObj = spinner;
    this.tableName = 'login_table';
    this.loginCredentials = {};
    this.showWelcomeMessage = true;
    document.addEventListener("deviceready", () => {
      this.fcm.getToken().then(token => {
        console.log(token);
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
        } else if(!data.wasTapped && Object.keys(this.loginCredentials).length) {
            this.presentToastWithOptions(data.body);
          console.log('Received in foreground');
        }
      });
      this.zone.run(() => {
        if (window.cordova && window.cordova.platformId !== 'browser') {
          this.db = window.sqlitePlugin.openDatabase({
            name: 'my.db',
            location: 'default',
            androidDatabaseProvider: 'system'
          });
          this.firstLoad = true;
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
    this.showFilterIcon = false;
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
      this.firstLoad = false;
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
    this.spinner.hide();
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
  public swipeList() {
    const swipeRoomListBoxes = document.querySelectorAll('.swipe-box');
    swipeRoomListBoxes.forEach(swipeBox => {
      const scroller = swipeBox.querySelector('.swipe-box__scroller');
      if (scroller) {
        scroller.scrollLeft += scroller.scrollWidth / 3;
      }
    });
    this.detectSwipe();
  }
  public detectSwipe() {
    let touchstartX: number = 0;
    let touchendX: number = 0;
    const gestureZone = document.getElementsByClassName('listHeader')[0];
    gestureZone.addEventListener('touchstart', (event: any) => {
      touchstartX = event.changedTouches[0].screenX;
    }, false);
    gestureZone.addEventListener('touchend', (event: any) => {
      touchendX = event.changedTouches[0].screenX;
      this.handleGesture(touchstartX, touchendX, event);
    }, false);
  }
  public handleGesture(startGesture: number, endGesture: number, event: any) {
    if (endGesture > startGesture) {
      const scrollerRowNo: number = parseInt(event.target.closest('.swipe-box').getAttribute('rowno'));
      const swipeBoxScroller: any = document.getElementsByClassName('swipe-box__scroller');
      for (let i = 0; i < swipeBoxScroller.length; i++) {
        if (i !== scrollerRowNo) {
          swipeBoxScroller[i].scrollTo({
            left: swipeBoxScroller[i].scrollWidth / 3,
            behavior: 'smooth'
          });
        }
      }
    }
  }
  imageOnError(event: any) {
    this.showProfileImageIcon = true;
    this.showProfileImage = false;
  }
  signOut(): void {
    this.showWelcomeMessage = false;
    this.loginCredentials = '';
    this.deleteLoginTable();
  }
  //Delete scenario
  deleteLoginTable() {
    if (window.cordova && window.cordova.platformId !== 'browser') {
      window.plugins.googleplus.logout(
        (obj: any) => {
          this.clearTableContents();
        },
        (msg: any) => {
          window.plugins.googleplus.trySilentLogin(
            {
              'webClientId': environment.WEB_APPLICATION_CLIENT_ID
            },
            (success: any) => {
              window.plugins.googleplus.logout(
                (data: any) => {
                  this.clearTableContents();
                }
              );
            },
            (err: any) => {
              console.log(err);
            }
          );
        }
      );
    } else if (!window.cordova || window.cordova.platformId === 'browser') {
      this.spinnerObj.show();
      if (!firebase.apps.length) {
        firebase.initializeApp(environment.firebaseConfig);
      } else {
        firebase.app();
      }
      firebase.auth().signOut()
        .then(() => {
          this.loginStorage.removeItem(this.tableName);
          this.zone.run(() => { this.router.navigateByUrl('/signin', { state: { data: 'SignOut' } }); });
        }, function (error) {
          console.log('Signout Failed');
        });
    }
  }
  clearTableContents() {
    this.db.transaction((tx: any) => {
      tx.executeSql('DELETE  FROM ' + this.tableName);
    }, function (error: any) {
      console.log('Transaction ERROR: ' + error.message);
    }, () => {
      this.zone.run(() => { this.router.navigateByUrl('/signin', { state: { data: 'SignOut' } }); });
    });
  }
  changeMode(event: any) {
    if (event.target.ariaChecked === "false") {
      document.getElementsByTagName('body')[0].classList.add('darkMode');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('darkMode');
    }
  }
  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      color: 'dark',
      duration: 2000
    });
    toast.present();
  }
  async presentToastWithOptions(message: any) {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      color: 'dark',
      duration: 3000,
      buttons: [{
        text: 'Reload',
        role: 'cancel',
        handler: () => {
          this.zone.run(() => { this.router.navigateByUrl('/my-meetings', { state: { data: this.loginCredentials } }) });
        }
      }
      ]
    });
    await toast.present();
  }
}
