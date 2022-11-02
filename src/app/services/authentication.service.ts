import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { apiUrl } from '../../environments/environment';
import { User } from '../model/user';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private httpHeaders = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("token")}`);

  constructor(private httpClient: HttpClient) {
  }

  authenticate(username: string, password: string) {
    return this.httpClient.post<any>(apiUrl.postLogin, {username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem("username", username);
          //let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem("token", userData.token);
          return userData;
        }
      )
    )
  }

  register(newUser: User) {
    return this.httpClient.post<User>(apiUrl.postRegister, newUser);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  currentUser(): string {
    let user = `${sessionStorage.getItem("username")}`;
    return user;
  }

  logOut() {
    sessionStorage.removeItem("username");
  }
}
