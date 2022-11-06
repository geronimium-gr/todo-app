import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() headerTitle: string = "";
  hasSideNav: boolean = false;

  currentUser!: string;

  constructor(
    private sessionService: SessionService,
    private authService: AuthenticationService,
    private route: Router) { }

  ngOnInit(): void {
    this.currentUser = this.sessionService.getUsername();
    this.hasSideNav = this.authService.isUserLoggedIn();
  }

  onLogout(): void {
    this.route.navigate(["/login"]).then(() => {
      this.authService.logOut();
    });
  }
}
