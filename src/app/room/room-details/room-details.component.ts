import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component'
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  roomDetails: Room = history.state.data;
  color: ThemePalette = 'primary';
  roomLaunchFlag: string = "Root Menu";

  constructor(private router: Router, private snackBar: SnackbarService, private titleChange: AppComponent, private activatedRoute: ActivatedRoute) {
    this.titleChange.title = this.activatedRoute.snapshot.data['title'];
    this.titleChange.setTitle(this.titleChange.title);
    if (typeof (history.state.data) === "undefined") {
      this.roomDetails = new Room();
    }
  }

  ngOnInit(): void {
  }

  getSubmitMsg() {
    this.snackBar.openSnackBar("Room details submitted successfully", '');
    this.router.navigateByUrl('/room-list', { state: { data: this.roomLaunchFlag } });
  }
}
