import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/room';
import { AppComponent } from '../../app.component';

import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent {
  roomDetails: Room = history.state.data;

  color: ThemePalette = 'primary';

  roomLaunchFlag: string = 'Root Menu';

  constructor(private router: Router, private snackBar: SnackbarService,
    private titleChange: AppComponent, private activatedRoute: ActivatedRoute) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    if (typeof (history.state.data) === 'undefined') {
      this.roomDetails = new Room();
    }
  }

  getSubmitMsg() {
    if (this.roomDetails.seats <= 0) {
      this.snackBar.openSnackBar('Seats should be more than 0', '');
    } else {
      this.snackBar.openSnackBar('Room details submitted successfully', '');
      this.router.navigateByUrl('/room-list', { state: { data: this.roomLaunchFlag } });
    }
  }
}
