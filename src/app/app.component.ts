import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meeting-App';
  displayHeading = true;
  showFabIcon = true;
  screenName;
  roomLaunchFlag = "Root Menu";
  routerPath: string = window.location.href.split("/", 4)[3];
  constructor(private location: Location, private router: Router) {
    if (this.routerPath === "meeting-details" || this.routerPath === "room-list" || this.routerPath === "room-search") {
      this.displayHeading = false;
      this.screenName = this.routerPath.replace("-", " ");
    }
  }

  ngOnInit() {
  }
  setTitle = () => {
    const route = window.location.href.split("/", 4)[3];
    const sidebarRequired = ["my-meetings", "signin"];
    if (sidebarRequired.includes(route)) {
      this.displayHeading = true;
      this.title = 'Meeting-App';
    } else {
      this.displayHeading = false;
      this.title = route;
    }
  }
  goBack = () => {
    this.location.back();
  }
  fnNavigateRoomList() {
    this.router.navigateByUrl('/room-list', { state: { data: this.roomLaunchFlag } });
  }
}
