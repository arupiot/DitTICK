import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor(
    private http: HttpClient,
  ) { }

  testPost() {
    const data = {
      'name': 'this is a name',
    }

    const url = 'http://127.0.0.1:5000/post';

    const headerDict = {
      'Content-Type': 'multipart/form-data',
      // 'Access-Control-Allow-Origin': origin,
    }

    const options = {
      headers: new HttpHeaders(headerDict),
    }

    return this.http.post(url,data,options);
  }

  subscribe() {
    const url = 'http://127.0.0.1:5000/subscribe';

    const headerDict = {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': origin,
    }

    const options = {
      headers: new HttpHeaders(headerDict),
    }

    return this.http.post(url,{},options);
  }
  publish() {
    const url = 'http://127.0.0.1:5000/publish';

    const headerDict = {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': origin,
    }

    const options = {
      headers: new HttpHeaders(headerDict),
    }

    return this.http.post(url,{},options);
  }
}
