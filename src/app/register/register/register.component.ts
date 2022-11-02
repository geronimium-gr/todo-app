import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageComponent } from '../../components/message/message.component';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  user!: User;
  registerSub!: Subscription;

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
    this.registerSub = this.authService.register(this.user)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(["/login"]);
        this.openDialog("Registration Success", "You can now login");
      },
      error: (err) => {
        this.openDialog("Registration Failed", err.error.result);
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
  }
}
