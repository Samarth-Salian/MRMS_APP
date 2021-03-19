import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  roomDetails = [
    {
        "_id": "6051bbae78b0bb34a04fd90b",
        "name": "Room D",
        "seats": 3,
        "phoneNo": "+919012788889",
        "floor": "2",
        "buildingId": "7878",
        "voipAvailable": true,
        "videoAvailable": true,
        "lanAvailable": true,
        "whiteBoardAvailable": true,
        "createdAt": "2021-03-17T08:19:58.233Z",
        "updatedAt": "2021-03-17T08:19:58.233Z",
        "__v": 0
    },
    {
        "_id": "6051bbdc78b0bb34a04fd90c",
        "name": "Room A",
        "seats": 12,
        "phoneNo": "+919012781224",
        "floor": "1",
        "buildingId": "7878",
        "voipAvailable": true,
        "videoAvailable": false,
        "lanAvailable": true,
        "whiteBoardAvailable": true,
        "createdAt": "2021-03-17T08:20:44.712Z",
        "updatedAt": "2021-03-17T08:20:44.712Z",
        "__v": 0
    }
]
constructor(private titleChange: AppComponent) {
  this.titleChange.setTitle();
}
  ngOnInit(): void {
  }

}
