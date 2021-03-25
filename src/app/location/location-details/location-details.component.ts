import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { SnackbarService } from '../../services/snackbar.service';

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

  constructor(private snackBar: SnackbarService, private activatedRoute: ActivatedRoute,
    public appComponent: AppComponent) {
    if (typeof (history.state.data) !== 'undefined') {
      this.appComponent.title = this.activatedRoute.snapshot.data.title;
      this.appComponent.setTitle(this.appComponent.title);
      this.buildingName = this.selectedLocation.buildingName;
      this.city = this.selectedLocation.city;
      this.country = this.selectedLocation.country;
    }
  }

  getSubmitMsg() {
    this.snackBar.openSnackBar('Location details submitted successfully', '');
  }
}
