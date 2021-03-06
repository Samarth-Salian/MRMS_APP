import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { CalenderComponent } from './calender/calender.component';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { RoomSearchComponent } from './room/room-search/room-search.component';
import { MyMeetingsComponent } from './meeting/my-meetings/my-meetings.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { LocationDetailsComponent } from './location/location-details/location-details.component';
import { MeetingDetailsComponent } from './meeting/meeting-details/meeting-details.component';
import { RoomDetailsComponent } from './room/room-details/room-details.component';
import { ProfileComponent } from './profile/profile.component';
import { InputStepperComponent } from './input-stepper/input-stepper.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule } from "ngx-spinner";
import { IonicModule } from '@ionic/angular';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Camera } from '@ionic-native/camera/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx'
import { enterAnimation } from './animations/nav-animate';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    CalenderComponent,
    MeetingListComponent,
    RoomListComponent,
    UserListComponent,
    RoomSearchComponent,
    MyMeetingsComponent,
    LocationListComponent,
    LocationDetailsComponent,
    MeetingDetailsComponent,
    RoomDetailsComponent,
    ProfileComponent,
    InputStepperComponent,
    BottomSheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgxMaterialTimepickerModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    MomentDateModule,
    MatSelectModule,
    MatSnackBarModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxSpinnerModule,
    MatBottomSheetModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['http://localhost:3000/auth/login'],
      },
    }),
    IonicModule.forRoot({
      navAnimation: enterAnimation
    }),
  ],
  providers: [HttpClientModule, AppComponent,
    DatePipe,
    Camera,
    FingerprintAIO,
    FCM,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  bootstrap: [AppComponent],
})
export class AppModule { }
