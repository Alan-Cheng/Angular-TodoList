import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../domain/entities';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api_url = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }

  findUser(username: string): Promise<User> {
    const url = `${this.api_url}/?username=${username}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let users = response as User[];
        return (users.length > 0) ? users[0] : null;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
