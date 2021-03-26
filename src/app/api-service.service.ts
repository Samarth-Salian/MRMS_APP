import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnknownError } from '../app/errorHandlers/unknown.error'
import { NotFoundError } from '../app/errorHandlers/notfound.error'
import { UnAuthorizedError } from '../app/errorHandlers/unauthorized.error'
import { BadRequestError } from '../app/errorHandlers/badrequest.error'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  url: string;
  requestType: string;
  request: any;
  token: string;
  constructor(private http: HttpClient) {
    this.url = '';
    this.requestType = '';
    this.request = '';
    this.token = '';
  }
  get() {
    const headers = { 'Authorization': this.token }
    this.http.get<any>(this.url, { headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        this.handleError(error);
      }
    })
  }
  post() {
    const headers = { 'Authorization': this.token };
    const body = {};
    this.http.post<any>(this.url, body, { headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        let e = this.handleError(error);
        console.log(e);
      }
    })
  }
  private handleError(error: Response) {
    if (error.status === 404) {
      let err = throwError(new NotFoundError(error, this.requestType))
      err.subscribe(e => console.log(e));
    }
    if (error.status === 401) {
      let err = throwError(new UnAuthorizedError(error, this.requestType));
      err.subscribe(e => console.log(e));
    }
    if (error.status === 400) {
      let err = throwError(new BadRequestError(error, this.requestType));
      err.subscribe(e => console.log(e));
    } else {
      let err = throwError(new UnknownError(error))
      err.subscribe(e => console.log(e));
    }
  }
}
