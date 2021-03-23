import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  roomDetails: Room = history.state.data;

  color: ThemePalette = 'primary';

  constructor(private toastr: ToastrService) {
    if (typeof (history.state.data) === 'undefined') {
      this.roomDetails = new Room();
    }
  }

  ngOnInit(): void {
  }
  getSubmitMsg(): void {
    this.toastr.success('Room details submitted successfully');
  }
}
