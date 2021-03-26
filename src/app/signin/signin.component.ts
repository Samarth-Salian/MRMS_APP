import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider, SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  appName = '';
  user: SocialUser;
  loggedIn: any;

  constructor(public appComponent: AppComponent, private authService: SocialAuthService) {
    this.appComponent.showProfileImage = false;
    this.appName = this.appComponent.title;
    this.user = new SocialUser();
    this.appComponent.setTitle('');
    this.appComponent.backButtonScreenName = 'signin';
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
