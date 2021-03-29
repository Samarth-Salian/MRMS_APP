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
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'my-meetings',
    component: MyMeetingsComponent,
    data: { title: 'Meeting List' },
  },
  {
    path: 'room-search',
    component: RoomSearchComponent,
    data: { title: 'Search Room' },
  },
  {
    path: 'room-list',
    component: RoomListComponent,
    data: { title: 'Room List' },
  },
  {
    path: 'meeting-details',
    component: MeetingDetailsComponent,
    data: { title: 'Edit Meeting' },
  },
  {
    path: 'location-list',
    component: LocationListComponent,
    data: { title: 'Location List' },
  },
  {
    path: 'location-details',
    component: LocationDetailsComponent,
    data: { title: 'Location Details' },
  },
  {
    path: 'room-details',
    component: RoomDetailsComponent,
    data: { title: 'Room Details' },
  },
  {
    path: 'user-list',
    component: UserListComponent,
    data: { title: 'Users List' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'User Profile' },
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
