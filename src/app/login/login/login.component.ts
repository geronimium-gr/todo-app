import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageComponent } from '../../components/message/message.component';
import { User } from '../../model/user';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  headerTitle: string = "To Do App";
  user!: User;
  loginSub!: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog)
  {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginSub = this.authService.authenticate(this.user.username, this.user.password)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(["/tasks"]);
      },
      error: (err) => {
        this.openDialog("Login Failed", err.error.result);
        console.log(err);
      }
    });
  }

  openDialog(title: string, message: string) {
    this.dialog.open(MessageComponent, {
      width: '250px',
      data: {title: title, subtitle: message}
    })
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
