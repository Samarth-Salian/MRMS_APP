import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {
  buildingName: string = "";
  city: string = "";
  country: string = "";
  selectedLocation: any = history.state.data;

  constructor(private snackBar: SnackbarService) {
    if (typeof (history.state.data) !== "undefined") {
      this.buildingName = this.selectedLocation.buildingName;
      this.city = this.selectedLocation.city;
      this.country = this.selectedLocation.country;
    }
  }
  ngOnInit(): void {
  }
  getSubmitMsg() {
    this.snackBar.openSnackBar("Location details submitted successfully", '');
  }
}
