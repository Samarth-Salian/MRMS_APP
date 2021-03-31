import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider, SocialUser } from "angularx-social-login";
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
  constructor(public appComponent: AppComponent, private authService: SocialAuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      this.userDetail = user;
    })
    this.appComponent.showProfileImage = false;
    this.appName = this.appComponent.title;
    this.user = "";
    this.appComponent.setTitle('');
    this.appComponent.backButtonScreenName = 'signin';
    if (typeof (history.state.data) !== 'undefined') {
      this.navigationFlag = history.state.data;
    }
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.navigationFlag === "SignOut" ? this.user = "" : "";
      if (this.user) {
        if (window.cordova && window.SQLitePlugin) {
          this.appComponent.insertLoginData(this.user);
        } else {
          let signInObj = { 'email': this.user.email, 'profilePic': this.user.photoUrl, 'firstName': this.user.firstName, "lastName": this.user.lastName };
          this.appComponent.loginStorage.setItem(this.appComponent.tableName, JSON.stringify(signInObj));
          this.appComponent.loginCredentials = JSON.parse(this.appComponent.loginStorage.getItem(this.appComponent.tableName));
          this.router.navigateByUrl('/my-meetings', { state: { data: this.appComponent.loginCredentials } });
        }
      } else {
        this.navigationFlag = "";
      }
    });
  }
  loginWithGoogle() {
    if (window.cordova) {
      if (window.cordova.platformId !== 'browser') {
        this.nativeGoogleLogin();
      } else {
        this.loginWithGoogle_Browser();
      }
    } else {
      this.loginWithGoogle_Browser();
    }
  }

  nativeGoogleLogin() {
    window.plugins.googleplus.login(
      {},
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
        if (window.cordova) {
          this.appComponent.insertLoginData(userObj);
        } else {
          this.appComponent.setImage(userObj?.imageUrl);
          this.appComponent.loginStorage.setItem(this.appComponent.tableName, JSON.stringify(userObj));
          this.appComponent.loginCredentials = JSON.parse(this.appComponent.loginStorage.getItem(this.appComponent.tableName));
          this.router.navigateByUrl('/my-meetings', { state: { data: this.appComponent.loginCredentials } });
        }
        console.log(res.user);
      }).catch(err => {
        console.log(err);
      })
  }
}