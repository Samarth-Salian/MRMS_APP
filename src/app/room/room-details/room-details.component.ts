import { Component, NgZone } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/room';
import { AppComponent } from '../../app.component';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component'
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import {
  HttpClient,
  HttpEventType
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";


@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent {
  roomDetails: Room = history.state.data;

  color: ThemePalette = 'primary';
  uploadImage: string;
  base64Img: string;
  progress: any;
  showUploadImageIcon: boolean = false;
  showCameraIconDiv: boolean = true;

  roomLaunchFlag: string = 'Root Menu';

  constructor(private zone: NgZone, private router: Router, public toastController: ToastController,
    public titleChange: AppComponent, private activatedRoute: ActivatedRoute, private http: HttpClient, private camera: Camera, private _bottomSheet: MatBottomSheet) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.uploadImage = '';
    this.progress = 0;
    this.base64Img = '';
    if (typeof (history.state.data) === 'undefined') {
      this.roomDetails = new Room();
      this.roomDetails.seats = 1;
    }
  }
  cameraOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL
  }
  gelleryOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    allowEdit: true
  }

  getSubmitMsg() {
    if (this.roomDetails.seats <= 0) {
      this.titleChange.presentToast('Seats should be more than 0');
    } else {
      this.titleChange.presentToast('Room details submitted successfully');
      this.zone.run(() => { this.titleChange.navCtlr.navigateBack('/room-list', { state: { data: this.roomLaunchFlag } }); });
    }
  }
  openBottomSheet() {
    this.progress = null;
    let sheetRef = this._bottomSheet.open(BottomSheetComponent)
    sheetRef.afterDismissed().subscribe(data => {
      this.uploadImage = '';
      if (!data) {
        this.showCameraIconDiv = true;
        this.showUploadImageIcon = false;
      }
      if (data.data === 'gallery') {
        this.openCamera(this.gelleryOptions);
      } else {
        this.openCamera(this.cameraOptions);
      }
    });
  }
  openCamera(options: any) {
    this.camera.getPicture(options).then((imgData) => {
      console.log('image data =>  ', imgData);
      this.base64Img = 'data:image/jpeg;base64,' + imgData;
      this.uploadImage = this.base64Img;
      this.upload(this.uploadImage);
      this.showUploadImageIcon = true;
      this.showCameraIconDiv = false;
    }, (err) => {
      this.showCameraIconDiv = true;
      this.showUploadImageIcon = false;
      console.log(err);
    })
  }
  upload(file: any) {
    this.progress = 1;
    const formData = new FormData();
    formData.append("file", file);

    this.http
      .post("yout-url-here", formData, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);
          } else if (event.type == HttpEventType.Response) {
            this.progress = null;
          }
        }),
        catchError((err: any) => {
          this.progress = 100;
          return throwError(err.message);
        })
      )
      .toPromise();
  }
}
