import { Component } from '@angular/core';
import { LoginComponent } from './login/login/login.component';
import { TaskListsComponent } from './tasks/task-lists/task-lists.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-application';
  headerName!: string;

  // onOutletLoaded(component: TaskListsComponent | LoginComponent) {
  //   if (component instanceof TaskListsComponent) {
  //     component.headerTitle = "List of Tasks";
  //     this.headerName = component.headerTitle;
  //     console.log(this.headerName);
  //   } else if (component instanceof LoginComponent) {
  //     component.headerTitle = "Login";
  //     this.headerName = component.headerTitle;
  //   }
  // }
}
