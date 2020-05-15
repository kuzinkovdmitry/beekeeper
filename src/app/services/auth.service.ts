import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../data/base-url';
import { ILoginData } from '../interfaces/login-data.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLogined: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  login(userData: ILoginData) {
    const loginUrl = `${BASE_URL}worker/loginUser?email=${userData.email}&password=${userData.password}`;
    return this.http.get(loginUrl);
  }

  logout() {
    localStorage.setItem('userData', '');
    this.setLoginState(false);
  }

  setLoginState(state: boolean) {
    this.isUserLogined.next(state);
  }
}
