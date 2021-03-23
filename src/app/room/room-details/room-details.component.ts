import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  selected: any;
  name: string = "";
  location: string = "";
  seats: string = "";
  lanAvailable: boolean = false;
  voipAvailable: boolean = false;
  videoAvailable: boolean = false;
  whiteBoardAvailable: boolean = false;
  selectRoomdetails: any = history.state.data;
  color: ThemePalette = 'primary';
  roomLaunchFlag: string = "Root Menu";

  constructor(private router: Router, private snackBar: SnackbarService) {
    if (typeof (history.state.data) !== "undefined") {
      this.name = this.selectRoomdetails.name;
      this.location = this.selectRoomdetails.location;
      this.seats = this.selectRoomdetails.seats;
      this.lanAvailable = this.selectRoomdetails.lanAvailable;
      this.voipAvailable = this.selectRoomdetails.voipAvailable;
      this.videoAvailable = this.selectRoomdetails.videoAvailable;
      this.whiteBoardAvailable = this.selectRoomdetails.whiteBoardAvailable;
    }
  }

  ngOnInit(): void {
  }

  getSubmitMsg() {
    this.snackBar.openSnackBar("Room details submitted successfully", '');
    this.router.navigateByUrl('/room-list', { state: { data: this.roomLaunchFlag } });
  }
}
