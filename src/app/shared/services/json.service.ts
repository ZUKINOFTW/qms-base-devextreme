import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PushJson } from '../models/models/pushJson.model';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  constructor(private http: HttpClient) {}

  getJson(): Observable<any> {
    return this.http.get(
      'http://192.168.1.21:8088/api/test/get-template/temp004'
    );
  }
  postJson(data: PushJson[]): Observable<any> {
    return this.http.post('http://192.168.1.21:8088/api/test/save', data);
  }
}
