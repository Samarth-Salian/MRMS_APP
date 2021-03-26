import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnknownError } from '../errorHandlers/unknown.error';
import { NotFoundError } from '../errorHandlers/notfound.error';
import { UnAuthorizedError } from '../errorHandlers/unauthorized.error';
import { BadRequestError } from '../errorHandlers/badrequest.error';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string;
  requestType: string;
  requestObj: any;
  token: string;
  constructor(private http: HttpClient) {
    this.url = '';
    this.requestType = '';
    this.requestObj = '';
    this.token = '';
  }
  get() {
    const headers = { 'Authorization': '`Bearer $this.token)`' }
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
    const headers = { 'Authorization': '`Bearer $this.token)`' }
    const body = this.requestObj
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
  put() {
    const body = this.requestObj;
    this.http.put<any>(this.url, body).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        let e = this.handleError(error);
        console.log(e);
      }
    });
  }
  delete() {
    const headers = { 'Authorization': '`Bearer $this.token)`' }
    this.http.delete(this.url, { headers }).subscribe({
      next: data => {
        console.log('Delete successful');
      },
      error: error => {
        let e = this.handleError(error);
        console.log(e);
      }
    });
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