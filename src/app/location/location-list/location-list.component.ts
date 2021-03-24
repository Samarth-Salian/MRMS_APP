import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit {
  locations: any;

  constructor(private titleChange: AppComponent, private activatedRoute: ActivatedRoute,
    public http: HttpClient, private router: Router) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.titleChange.showFabIcon = false;
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
