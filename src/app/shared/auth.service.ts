import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UserInfo } from './UserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo: UserInfo | undefined;

  constructor(private fireAuth: AngularFireAuth) {
    this.fireAuth.authState.subscribe(user => {
      console.log(user);
      this.userInfo ;
    })
  }
  async loginWithGoogle() {
    await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      res => {
        console.log(res.user);
      }).catch(err => {
        console.log(err);
      })
  }
}
