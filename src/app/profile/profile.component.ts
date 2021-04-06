import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';

declare let window: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
    user: any;

    appName = '';

    locations = ['Select', 'Building A, Bangalore', 'Building B, Bangalore', 'Building C, Bangalore'];

    constructor(private zone: NgZone, public http: HttpClient, private titleChange: AppComponent,
        private activatedRoute: ActivatedRoute, private router: Router) {
        this.titleChange.title = this.activatedRoute.snapshot.data.title;
        this.titleChange.setTitle(this.titleChange.title);
        this.titleChange.showProfileImage = false;
        this.user = this.titleChange.loginCredentials;
    }

    public clickUpdate() {
        this.titleChange.goBack();
    }

    signOut(): void {
        this.titleChange.showWelcomeMessage = false;
        this.titleChange.loginCredentials = '';
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
            if (!firebase.apps.length) {
                firebase.initializeApp(environment.firebaseConfig);
            } else {
                firebase.app();
            }
            firebase.auth().signOut()
                .then(() => {
                    this.titleChange.loginStorage.removeItem(this.titleChange.tableName);
                    this.zone.run(() => { this.router.navigateByUrl('/signin', { state: { data: 'SignOut' } }); });
                }, function (error) {
                    console.log('Signout Failed');
                });
        }
    }
    clearTableContents() {
        this.titleChange.db.transaction((tx: any) => {
            tx.executeSql('DELETE  FROM ' + this.titleChange.tableName);
        }, function (error: any) {
            console.log('Transaction ERROR: ' + error.message);
        }, () => {
            this.zone.run(() => { this.router.navigateByUrl('/signin', { state: { data: 'SignOut' } }); });
        });
    }
}
