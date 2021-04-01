import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackbarService } from '../services/snackbar.service';
import { environment } from 'src/environments/environment';
declare let window: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  userDetail: any;
  appName = '';
  user: any;
  navigationFlag: string | undefined;
  constructor(public appComponent: AppComponent, private router: Router, private afAuth: AngularFireAuth, private snackBar: SnackbarService) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      this.userDetail = user;
    })
    this.appComponent.showProfileImage = false;
    this.appName = this.appComponent.title;
    this.user = "";
    this.appComponent.setTitle('signin');
    this.appComponent.backButtonScreenName = 'signin';
    if (typeof (history.state.data) !== 'undefined') {
      this.navigationFlag = history.state.data;
    }
    if (this.appComponent.loginCredentials === '') {
      this.snackBar.openSnackBar('Signed out Successfully', '');
    }
  }

  ngOnInit(): void { }
  loginWithGoogle() {
    if (window.cordova && window.cordova.platformId !== 'browser') {
      this.nativeGoogleLogin();
    } else if (!window.cordova || window.cordova.platformId === 'browser') {
      this.loginWithGoogle_Browser();
    }
  }

  nativeGoogleLogin() {
    window.plugins.googleplus.login(
      {
        'webClientId': environment.WEB_APPLICATION_CLIENT_ID
      },
      (obj: any) => {
        this.appComponent.insertLoginData(obj);
        console.log(obj);
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }
  async loginWithGoogle_Browser() {
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      res => {
        let userObj: any = {
          'email': res.user?.email,
          'displayName': res.user?.displayName,
          'imageUrl': res.user?.photoURL,
          'profilePic': res.user?.photoURL
        }
        this.appComponent.setImage(userObj?.imageUrl);
        this.appComponent.loginStorage.setItem(this.appComponent.tableName, JSON.stringify(userObj));
        this.appComponent.loginCredentials = JSON.parse(this.appComponent.loginStorage.getItem(this.appComponent.tableName));
        this.router.navigateByUrl('/my-meetings', { state: { data: this.appComponent.loginCredentials } });
        console.log(res.user);
      }).catch(err => {
        console.log(err);
      })
  }
}