import { Injectable } from '@angular/core';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root',
})
export class SessionManagerService {
  userInfo = {} as UserInfo;

  constructor() {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
