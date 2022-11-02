import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit, OnDestroy {

  headerTitle: string = "Home";
  currentUser!: string;
  tasks: Task[] = [];
  displayedColumns: string[] = ["id", "title", "description", "user_id", "actions"];
  taskSub!: Subscription

  constructor(private taskService: TaskService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.taskSub = this.taskService.findAll().subscribe(taskList => {
      this.tasks = taskList;
    });

    this.currentUser = this.authService.currentUser();

  }

  updateTaskDialog(row: Object) {

  }

  ngOnDestroy(): void {
    if(this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }

}
