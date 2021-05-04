import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppComponent } from '../app.component';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

declare let window: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  showMessage: boolean;

  userDetail: any;

  appName = '';

  user: any;

  navigationFlag: string | undefined;

  constructor(private zone: NgZone, public appComponent: AppComponent, private router: Router,
    private afAuth: AngularFireAuth, public toastController: ToastController) {
    this.showMessage = this.appComponent.showWelcomeMessage;
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      this.userDetail = user;
    });
    this.appComponent.showProfileImage = false;
    this.appName = this.appComponent.title;
    this.user = '';
    this.appComponent.setTitle('signin');
    this.appComponent.backButtonScreenName = 'signin';
    if (typeof (history.state.data) !== 'undefined') {
      this.navigationFlag = history.state.data;
    }
    if (this.appComponent.loginCredentials === '') {
      this.appComponent.spinnerObj.hide();
      this.openToast('Signed out Successfully');
    }
  }
  async openToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      color: 'primary',
      duration: 2000
    });
    toast.present();
  }

  loginWithGoogle() {
    if (window.cordova && window.cordova.platformId !== 'browser') {
      this.nativeGoogleLogin();
    } else if (!window.cordova || window.cordova.platformId === 'browser') {
      this.loginWithGoogle_Browser();
    }
  }

  nativeGoogleLogin() {
    this.appComponent.spinnerObj.show();
    window.plugins.googleplus.login(
      {
        'webClientId': environment.WEB_APPLICATION_CLIENT_ID,
      },
      (obj: any) => {
        this.appComponent.insertLoginData(obj);
        console.log(obj);
      },
      (msg: any) => {
        console.log(msg);
        this.appComponent.spinnerObj.hide();
      },
    );
  }

  async loginWithGoogle_Browser() {
    this.appComponent.spinnerObj.show();
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      res => {
        let userObj: any = {
          emailId: res.user?.email,
          displayName: res.user?.displayName,
          imageUrl: res.user?.photoURL,
          profilePic: res.user?.photoURL,
        };
        this.appComponent.setImage(userObj?.imageUrl);
        this.appComponent.loginStorage.setItem(this.appComponent.tableName, JSON.stringify(userObj));
        this.appComponent.loginCredentials = JSON.parse(this.appComponent.loginStorage.getItem(this.appComponent.tableName));
        this.zone.run(() => { this.router.navigateByUrl('/my-meetings', { state: { data: this.appComponent.loginCredentials } }); });
        console.log(res.user);
        this.appComponent.spinnerObj.hide();
      }).catch(err => {
        console.log(err);
      });
  }
}
