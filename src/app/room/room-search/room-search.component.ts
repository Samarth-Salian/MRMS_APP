import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { Room } from 'src/app/models/room';
import { AppComponent } from '../../app.component';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css'],
})
export class RoomSearchComponent implements OnInit {
  color: ThemePalette = 'primary';

  selected: any;

  locations = ['Select', 'Building A', 'Building B', 'Building C'];

  roomSearch: Room;

  fromTime = '';

  toTime = '';

  minDate: any = '';

  todayDate: any;

  constructor(private zone: NgZone, private activatedRoute: ActivatedRoute, public titleChange: AppComponent,
    private router: Router, public modalController: ModalController, public toastController: ToastController, public datepipe: DatePipe) {
    this.titleChange.roomListBackButton = false;
    this.minDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.todayDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.titleChange.showFabIcon = false;
    this.roomSearch = new Room();
    this.formatDate();
    this.roomSearch.date = moment(new Date()).format('DD-MM-YYYY');
    this.roomSearch.seats = 1;
  }

  ngOnInit(): void {
    this.roomSearch.fromTime = this.fromTime;
    this.roomSearch.toTime = this.toTime;
  }
  setDate() {
  }

  public fnNavigateToRoomList() {
    if (this.roomSearch.seats <= 0) {
      this.presentToast('Seats should be more than 0');
    } else {
      //this.dialogRef.close({ data: this.roomSearch });
      this.zone.run(() => { this.router.navigateByUrl('/room-list', { state: { data: this.roomSearch } }); });
    }
  }
  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      color: 'primary',
      duration: 2000
    });
    toast.present();
  }

  onCalendarChange(pthis: any) {
    this.roomSearch.date = pthis.targetElement.value;
  }

  formatDate() {
    const minutes = new Date().getMinutes();

    let updatedMinutes: Date = new Date();

    if (minutes >= 0 && minutes < 15) {
      const rMin = 15 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin));
    } else if (minutes >= 15 && minutes < 30) {
      const rMin = 30 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin));
    } else if (minutes >= 30 && minutes < 45) {
      const rMin = 45 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin));
    } else if (minutes >= 45 && minutes < 59) {
      const rMin = 60 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin));
    }
    const fromDate: string = this.formatDateAndTime(updatedMinutes);
    const updatedHours = new Date(updatedMinutes.setHours(updatedMinutes.getHours() + 1));
    const toDate: string = this.formatDateAndTime(updatedHours);
    this.fromTime = fromDate;
    this.toTime = toDate;
  }

  formatDateAndTime(updatedMinutes: Date) {
    // const normalizeHour = updatedMinutes.getHours() >= 12 ? updatedMinutes.getHours() - 12 : updatedMinutes.getHours();
    //const finalTime = ('0' + updatedMinutes.getMinutes()).slice(-2);
    //return updatedMinutes.getHours() >= 12 ? normalizeHour + ':' + finalTime : normalizeHour + ':' + finalTime;
    return updatedMinutes.getHours() + ':' + ('0' + updatedMinutes.getMinutes()).slice(-2);
  }

  closeDialogBox() {
    //this.dialogRef.close();
  }
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
