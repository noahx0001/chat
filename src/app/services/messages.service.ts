import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiURI = 'http://192.168.1.66:8000/api/v1';

  constructor(private http: HttpClient) { }

  store(message: any): Observable<any> {
    return this.http.post(this.apiURI + '/messages', { message });
  }
}
