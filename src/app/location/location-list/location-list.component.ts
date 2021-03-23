import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: any;
  constructor(public http: HttpClient, private router: Router) {
    this.getjson().subscribe(data => {
      this.locations = data;
    });
  }
  ngOnInit(): void {
  }
  public getjson(): Observable<any> {
    return this.http.get('assets/locationList.json').pipe();
  }
  public fnNavigateToLocation(selectedLocation: any): any {
    this.router.navigateByUrl('/location-details', { state: { data: selectedLocation } });
  }

}
