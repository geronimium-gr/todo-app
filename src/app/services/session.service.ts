import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getToken() : string {
    return `${sessionStorage.getItem("token")}`;
  }

  getUsername() : string {
    return `${sessionStorage.getItem("username")}`;
  }
}
