import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/room';
import { AppComponent } from '../../app.component';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.css'],
})
export class MyMeetingsComponent {
  roomSearchs: Room;

  todayDate = new FormControl(new Date());
  constructor(private titleChange: AppComponent, private activatedRoute: ActivatedRoute, private fio: FingerprintAIO) {
    if (this.titleChange.firstLoad) {
      this.login();
    }
    this.roomSearchs = new Room();
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
  }
  login() {
    this.fio.isAvailable().then((result: any) => {
      console.log(result)

      this.fio.show({
        cancelButtonTitle: 'Cancel',
        description: "Some biometric description",
        disableBackup: true,
        title: 'Scanner Title',
        fallbackButtonTitle: 'FB Back Button',
        subtitle: 'This SubTitle'
      })
        .then((result: any) => {
          this.titleChange.firstLoad = false;
          console.log(result)
          alert("Successfully Authenticated!")
        })
        .catch((error: any) => {
          console.log(error)
          alert("Match not found!")
          this.login();
        });

    })
      .catch((error: any) => {
        console.log(error)
      });
  }
}
