
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {
  buildingName = '';
  city = '';
  country = '';
  selectedLocation: any = history.state.data;
  constructor(private toastr: ToastrService) {
    if (typeof (history.state.data) !== 'undefined') {
      this.buildingName = this.selectedLocation.buildingName;
      this.city = this.selectedLocation.city;
      this.country = this.selectedLocation.country;
    }
  }
  ngOnInit(): void {
  }
  getSubmitMsg(): void {
    this.toastr.success('location details submitted successfully');
  }
}
