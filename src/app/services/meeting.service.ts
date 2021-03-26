import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service'

@Injectable({
  providedIn: 'root',
})

export class MeetingService {
  requestType: string;
  getToken: string;
  request: any;
  constructor(private genericApiMethod: ApiService) {
    this.requestType = '';
    this.getToken = '';
    this.request = '';
    this.genericApiMethod.url = 'https://jsonplaceholder.typicode.com/posts/1';

  }
  callApi() {
    this.genericApiMethod.requestType = this.requestType;
    this.genericApiMethod.token = this.getToken;
    this.genericApiMethod.requestObj = this.request;
    if (this.requestType === 'delete') {
      this.genericApiMethod.delete();
    } else if (this.requestType === 'put') {
      this.genericApiMethod.put();
    } else if (this.requestType === 'get') {
      this.genericApiMethod.get();
    } else {
      this.genericApiMethod.post();
    }
  }
}
