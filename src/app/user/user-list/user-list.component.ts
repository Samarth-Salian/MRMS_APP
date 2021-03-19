import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
users:any;
constructor(public http: HttpClient) {
  this.getjson().subscribe(data => {
    this.users = data;
  })
}

  ngOnInit(): void {
  }
  public getjson(): Observable<any> {
    return this.http.get("assets/userList.json").pipe()
  }

}
