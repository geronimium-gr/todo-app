import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { apiUrl } from '../../environments/environment';
import { User } from '../model/user';
import { SessionService } from './session.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private httpHeaders = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("token")}`);

  private helper = new JwtHelperService();

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
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
    if (sessionStorage.getItem("token") === null) {
      return false;
    }

    return this.helper.isTokenExpired(this.sessionService.getToken()) ? false : true;
  }

  // checkExpiration() {
  //   const token = this.sessionService.getToken();
  //   const payload = window.atob(token.split('.')[1]); //decode payload of token
  //   const parsePayload = JSON.parse(payload); //convert payload to object

  //   return parsePayload.exp > Date.now() / 100;
  // }

  logOut() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
  }
}
