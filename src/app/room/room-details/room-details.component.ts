import { Component, NgZone } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/room';
import { AppComponent } from '../../app.component';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component'
import { SnackbarService } from '../../services/snackbar.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
declare var foo: any;
declare var window: any;

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent {
  roomDetails: Room = history.state.data;
  selectedType: string;
  color: ThemePalette = 'primary';

  roomLaunchFlag: string = 'Root Menu';
  srcType: number;
  uploadImage: string;

  constructor(private zone: NgZone, private router: Router, private snackBar: SnackbarService,
    public titleChange: AppComponent, private activatedRoute: ActivatedRoute, private _bottomSheet: MatBottomSheet) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.selectedType = '';
    this.uploadImage = '';
    this.srcType = 0;
    if (typeof (history.state.data) === 'undefined') {
      this.roomDetails = new Room();
      this.roomDetails.seats = 1;
    }
  }

  getSubmitMsg() {
    if (this.roomDetails.seats <= 0) {
      this.snackBar.openSnackBar('Seats should be more than 0', '');
    } else {
      this.snackBar.openSnackBar('Room details submitted successfully', '');
      this.zone.run(() => { this.router.navigateByUrl('/room-list', { state: { data: this.roomLaunchFlag } }); });
    }
  }
  openBottomSheet() {
    let sheetRef = this._bottomSheet.open(BottomSheetComponent)
    sheetRef.afterDismissed().subscribe(data => {
      this.openCamera(data);
    });
  }
  openCamera(selectedType: any) {
    if (selectedType.data === 'gallery') {
      this.srcType = 0;
    } else {
      this.srcType = 1;
    }

    let options = this.setOptions(this.srcType);

    foo.camera.getPicture((imageUrl: any) => {
      if (window.cordova.platformId === 'browser') {
        this.uploadImage = "data:image/jpeg;base64," + imageUrl;
      } else {
        this.uploadImage = imageUrl;
      }
    }, function cameraError(error: any) {
      console.debug("Unable to obtain picture: " + error, "app");

    }, options);

  }
  setOptions(srcType: number) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      DestinationType: 1,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      EncodingType: 0,
      MediaType: 0,
      AllowEdit: true,
      CorrectOrientation: true
    }
    return options;
  }
}
