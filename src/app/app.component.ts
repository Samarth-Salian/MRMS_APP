import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  backButtonScreenName: string = '';
  roomListBackButton: boolean = true;
  title = 'Meeting-App';
  displayHeading = true;
  showFabIcon = true;
  screenName;
  roomLaunchFlag = 'Root Menu';
  routerPath: string = window.location.href.split('/', 4)[3];
  constructor(private location: Location, private router: Router) {
    if (this.routerPath === 'meeting-details' || this.routerPath === 'room-list' || this.routerPath === 'room-search') {
      this.displayHeading = false;
      this.screenName = this.routerPath.replace('-', ' ');
    }
  }

  OnInit(): void {
  }
  setTitle = (param: string) => {
    if (param === '') {
      this.displayHeading = true;
      this.title = 'Meeting-App';
    } else {
      this.displayHeading = false;
      this.title = param;
    }
  }
  goBack = () => {
    const path = window.location.href.split("/", 4)[3];
    const sidebarRequired = ['room-details', 'room-list'];
    if (sidebarRequired.includes(path) && this.roomListBackButton) {
      if (path === 'room-details') {
        this.router.navigateByUrl('/room-list');
      } else {
        if (this.backButtonScreenName === 'signin') {
          this.router.navigateByUrl('/signin');
        } else {
          this.router.navigateByUrl('/my-meetings');
        }
      }
    } else {
      this.location.back();
    }
  }
  fnNavigateRoomList(): void {
    this.router.navigateByUrl('/room-list', { state: { data: this.roomLaunchFlag } });
  }
}
