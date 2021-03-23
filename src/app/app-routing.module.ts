import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationDetailsComponent } from './location/location-details/location-details.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { MeetingDetailsComponent } from './meeting/meeting-details/meeting-details.component';
import { MyMeetingsComponent } from './meeting/my-meetings/my-meetings.component';
import { RoomDetailsComponent } from './room/room-details/room-details.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { RoomSearchComponent } from './room/room-search/room-search.component';
import { SigninComponent } from './signin/signin.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [

  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'my-meetings',
    component: MyMeetingsComponent
  },
  {
    path: 'room-search',
    component: RoomSearchComponent
  },
  {
    path: 'room-list',
    component: RoomListComponent
  },
  {
    path: 'meeting-details',
    component: MeetingDetailsComponent
  },
  {
    path: 'location-list',
    component: LocationListComponent
  },
  {
    path: 'location-details',
    component: LocationDetailsComponent
  },
  {
    path: 'room-details',
    component: RoomDetailsComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
