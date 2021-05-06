import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ToastController } from '@ionic/angular';
import { async } from 'rxjs';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
})
export class LocationDetailsComponent {
  buildingName: string = '';

  city: string = '';

  country: string = '';

  selectedLocation: any = history.state.data;

  constructor(public toastController: ToastController, private activatedRoute: ActivatedRoute,
    public appComponent: AppComponent, private zone: NgZone) {
    if (typeof (history.state.data) !== 'undefined') {
      this.buildingName = this.selectedLocation.buildingName;
      this.city = this.selectedLocation.city;
      this.country = this.selectedLocation.country;
    }
    this.appComponent.title = this.activatedRoute.snapshot.data.title;
    this.appComponent.setTitle(this.appComponent.title);
  }
  getSubmitMsg() {
    this.appComponent.presentToast('Seats should be more than 0');
  }
}
