import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-finished-tasks',
  templateUrl: './finished-tasks.component.html',
  styleUrls: ['./finished-tasks.component.scss']
})
export class FinishedTasksComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  displayedColumns: string[] = ["id", "title", "description", "datetime_completed", "user_id", "actions"];
  taskSub!: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskSub = this.taskService.findAllCompletedTasks()
    .subscribe({
      next: (taskList) => {
        this.tasks = taskList;
        console.log(taskList);

      },
      error: (err) => {
        console.log(err);

      }
    });
  }

  deleteTaskDialog(row: Object) {

  }

  ngOnDestroy(): void {
    if(this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }

}
