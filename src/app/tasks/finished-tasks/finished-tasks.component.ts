import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
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
  taskFinishedSub!: Subscription;
  currentUser!: string;

  constructor(
    private taskService: TaskService,
    private sessionService: SessionService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("Oninit");
    this.getAllTasks();
    this.currentUser = this.sessionService.getUsername();
  }

  getAllTasks(): void {
    this.taskFinishedSub = this.taskService.findAllCompletedTasks()
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

  redoTask(row: any) {
    this.taskFinishedSub = this.taskService.redoTask(row.id).subscribe((result) => {
      console.log(result);
      this.getAllTasks();
      this.changeDetector.detectChanges();
    });
  }

  deleteTaskDialog(row: any) {

  }

  ngOnDestroy(): void {
    console.log("destroy");
    if(this.taskFinishedSub) {
      this.taskFinishedSub.unsubscribe();
    }
  }

}
