import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: any;

  constructor(public http: HttpClient) {
    this.getjson().subscribe(data => {
      this.locations = data;
    })
  }

  ngOnInit(): void {
  }
  public getjson(): Observable<any> {
    return this.http.get("assets/locationList.json").pipe()
  }

}
