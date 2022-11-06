import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {

  task!: Task
  taskSub!: Subscription;

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>, private taskService: TaskService) {
    this.task = new Task();
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
   this.taskSub = this.taskService.save(this.task).subscribe((result) => {
      console.log(result);
    })

    form.reset();
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close("User cancelled action");
  }

  ngOnDestroy(): void {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }
}
