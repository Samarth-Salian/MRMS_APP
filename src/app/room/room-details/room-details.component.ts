import { Component, NgZone, } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/room';
import { AppComponent } from '../../app.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component'
import { SnackbarService } from '../../services/snackbar.service';
import { UploadFileService } from '../../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var foo: any;

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent {
  roomDetails: Room = history.state.data;

  color: ThemePalette = 'primary';

  roomLaunchFlag: string = 'Root Menu';
  selectedFiles: any;
  currentFile: any;
  progress = 0;
  message = '';

  fileInfos: any;

  constructor(private zone: NgZone, private router: Router, private snackBar: SnackbarService,
    public titleChange: AppComponent, private activatedRoute: ActivatedRoute, private _bottomSheet: MatBottomSheet, private uploadService: UploadFileService) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    if (typeof (history.state.data) === 'undefined') {
      this.roomDetails = new Room();
      this.roomDetails.seats = 1;
    }
    //navigator.camera.getPicture()
  }
  ngOnInit(): void {
    console.log(foo);
    this.fileInfos = this.uploadService.getFiles();
  }
  cameraCallback(imageData: any) {
    //var image = document.getElementById('myImage');
    //image.src = "data:image/jpeg;base64," + imageData;
  }
  cameraOptions = {
    quality: 80,
    destinationType: 'FILE_URI',
    sourceType: 'CAMERA',
    mediaType: 'PICTURE',
    encodingType: 'JPEG',
    cameraDirection: 'BACK',
    targetWidth: 300,
    targetHeight: 400
  }
  cameraError() {
    console.log('failed');
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
    //this._bottomSheet.open(BottomSheetComponent);
    var srcType1 = 1;
    var options = this.setOptions(srcType1);
    //var func = createNewFileEntry;

    foo.camera.getPicture(function cameraSuccess(imageUri: any) {

      //displayImage(imageUri);
      // You may choose to copy the picture, save it somewhere, or upload.
      //func(imageUri);

    }, function cameraError(error: any) {
      console.debug("Unable to obtain picture: " + error, "app");

    }, options);
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }
  setOptions(srcType: any) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      DestinationType: 1,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: 0,
      EncodingType: 0,
      MediaType: 0,
      AllowEdit: true,
      CorrectOrientation: true
    }
    return options;
  }
}
