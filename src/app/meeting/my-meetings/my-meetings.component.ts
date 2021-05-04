import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/room';
import { AppComponent } from '../../app.component';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
declare let window: any;

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.css'],
})
export class MyMeetingsComponent {
  roomSearchs: Room;
  

  todayDate: any;
  constructor(private titleChange: AppComponent, public datepipe: DatePipe, public toastController: ToastController, private navCtlr: NavController, private activatedRoute: ActivatedRoute, private fio: FingerprintAIO) {
    if (this.titleChange.firstLoad) {
      this.login();
    }
    this.roomSearchs = new Room();
    this.todayDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.titleChange.roomListBackButton = true;
    this.titleChange.title = this.activatedRoute.snapshot.data[''];
    this.titleChange.showProfileImage = true;
    this.titleChange.setTitle('');
    this.titleChange.setImage(this.titleChange.loginCredentials.profilePic);
    this.titleChange.showFabIcon = true;
    this.titleChange.backButtonScreenName = 'meeting';
  }

  onCalendarChange(pthis: any) {
    this.roomSearchs.date = pthis.targetElement.value;
  }
  fabIconValidation() {
    this.titleChange.showFabIcon = false;
    this.titleChange.showFilterIcon = true;
    this.navCtlr.navigateForward('/room-list');
  }
  login() {
    if (window.cordova && window.cordova.platformId !== 'browser') {
      document.getElementsByTagName('body')[0].classList.add('backgroundFade');
    }
    this.fio.isAvailable().then((result: any) => {
      console.log(result)

      this.fio.show({
        cancelButtonTitle: 'Cancel',
        disableBackup: true,
        title: 'Login using Fingerprint',
        fallbackButtonTitle: 'FB Back Button',
        subtitle: 'Please tap on the fingerprint scanner of your device to login'
      })
        .then((result: any) => {
          document.getElementsByTagName('body')[0].classList.remove('backgroundFade');
          this.titleChange.firstLoad = false;
          console.log(result)
        })
        .catch((error: any) => {
          console.log(error)
          this.presentToastWithOptions();
        });

    })
      .catch((error: any) => {
        document.getElementsByTagName('body')[0].classList.remove('backgroundFade');
      });
  }
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Match not found!',
      position: 'bottom',
      color: 'primary',
      buttons: [{
        text: 'Done',
        role: 'cancel',
        handler: () => {
          this.login();
        }
      }
      ]
    });
    await toast.present();
  }
  navigateForward() {
    this.navCtlr.navigateForward('/room-list');
  }
}
