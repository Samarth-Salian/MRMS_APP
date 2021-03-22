import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr: ToastrService) {
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
    this.toastr.success("Room details submitted successfully");
  }
}
