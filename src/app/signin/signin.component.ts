import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare let window: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  appName = '';
  user: SocialUser;
  constructor(public appComponent: AppComponent, private activatedRoute: ActivatedRoute, private authService: SocialAuthService, private router: Router) {
    this.appComponent.showProfileImage = false;
    this.appName = this.appComponent.title;
    this.appComponent.displayHeading = true;
    this.appComponent.title = this.activatedRoute.snapshot.data[''];
    this.user = new SocialUser();
    this.appComponent.setTitle(this.appComponent.title);
    this.appComponent.backButtonScreenName = 'signin';
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
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
        if (window.cordova && window.SQLitePlugin) {
          this.appComponent.retrieveLoginData('signinData');
          //To Create Table
        }
      }
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}