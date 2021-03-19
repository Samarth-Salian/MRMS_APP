import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

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
    RoomDetailsComponent
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
    ToastrModule.forRoot(),
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule, MatRippleModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
