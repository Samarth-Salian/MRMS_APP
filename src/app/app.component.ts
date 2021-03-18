import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meeting-App';
  displayHeading = true;
  screenName;
  routerPath:string = window.location.href.split("/",4)[3];
  constructor(){
        if(this.routerPath === "meeting-details"){
            this.displayHeading = false;
            this.screenName = this.routerPath;
        }
    }
  
  ngOnInit() {
  }
}
