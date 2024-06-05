import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Auth, User } from '../domain/entities';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject('user') private userService: UserService) { }

  loginWithCredentials(username: string, password: string): Promise<Auth> {
    return this.userService
    .findUser(username)
    .then(user => {
      let auth = new Auth();
      localStorage.removeItem('userId');
      let redirectUrl = (localStorage.getItem('redirectUrl') === null) ? '/' : localStorage.getItem('redirectUrl') as string;
      auth.redirectUrl = redirectUrl;
      if (user === null) {
        auth.hasError = true;
        auth.errMsg = '使用者不存在';
      } else if (user.password === password) {
        auth.user = Object.assign({}, user);
        auth.hasError = false;
        localStorage.setItem('userId', user.id.toString());
        auth.redirectUrl = `../todo`
      } else {
        auth.hasError = true;
        auth.errMsg = '密碼錯誤';
      }
      return auth;
    });
  }
}
