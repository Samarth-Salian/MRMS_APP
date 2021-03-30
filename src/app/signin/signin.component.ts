import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
declare let window: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  userDetail:any;
  appName = '';
  user:any;
  navigationFlag:string | undefined;
  constructor(private authServices:AuthService,public appComponent: AppComponent, private authService: SocialAuthService, private router: Router,private afAuth: AngularFireAuth,private gplus: GooglePlus) {
    this.userDetail = this.afAuth.authState;
    this.appComponent.showProfileImage = false;
    this.appName = this.appComponent.title;
    this.user="";
    this.appComponent.setTitle('');
    this.appComponent.backButtonScreenName = 'signin';
    if (typeof (history.state.data) !== 'undefined') {
    this.navigationFlag = history.state.data;
    }
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.navigationFlag === "SignOut" ? this.user = "" :"";
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
  signInWithGoogle(): void {
   // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  loginWithGoogle(){
    if(window.cordova){
      this.nativeGoogleLogin();
    }else{
    this.authServices.loginWithGoogle();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId':'522030334748-rg5qr895afi3pia92tclqh6h3d6c7348.apps.googleusercontent.com',
        'offline':true,
        'scopes':'profile email'
      })
      console.log(JSON.stringify(gplusUser));
      return await this.afAuth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      ).then((_success: any) => {
        console.log(_success);
      })
    } catch(err) {
      console.log(err);
    }
  }
}