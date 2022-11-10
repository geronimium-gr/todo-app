import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task } from '../../model/task';
import { DeleteTasksComponent } from '../delete-tasks/delete-tasks.component';
import { UpdateTasksComponent } from '../update-tasks/update-tasks.component';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit, OnDestroy {
  // @ViewChild('drawer')
  // drawer!: ElementRef;

  currentUser!: string;
  currentImg!: string;
  tasks: Task[] = [];
  displayedColumns: string[] = ["id", "title", "description", "user_id", "actions"];
  taskSub!: Subscription;

  private helper = new JwtHelperService();


  constructor(
    private taskService: TaskService,
    private sessionService: SessionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.taskSub = this.taskService.findAll()
      .subscribe({
        next: (taskList) => {
          this.tasks = taskList;
          console.log(taskList);

        },
        error: (err) => {
          console.log(err);

        }
    });

    this.currentUser = this.sessionService.getUsername();
    this.currentImg = `background-image: url(https://avatars.dicebear.com/api/avataaars/${this.currentUser}.svg);`;

  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("dialog-close");
      this.ngOnInit();
    })
  }

  updateTaskDialog(row: Object) {
    const dialogRef = this.dialog.open(UpdateTasksComponent, {
      width: "300px",
      data: {element: row}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("dialog-close");
      this.ngOnInit();
    });
  }

  deleteTaskDialog(row: Object) {
    const dialogRef = this.dialog.open(DeleteTasksComponent, {
      width: "300px",
      data: {element: row}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("dialog-close");
      this.ngOnInit();
    });
  }

  finishTask(row: any) {
    this.taskService.completeTask(row).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  ngOnDestroy(): void {
    if(this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }

}
