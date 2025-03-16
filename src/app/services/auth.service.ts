import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiURI = 'http://127.0.0.1:8000/api/v1';
  login(data: any): Observable<any> {
    return this.http.post(this.apiURI + '/login', data);
  }

  register(data: any): Observable<any> {
    return this.http.post(this.apiURI + '/register', data);
  }

  logout() {
    return this.http.get(this.apiURI + '/logout');
  }

  isAuthenticated() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
