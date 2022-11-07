import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {

  task!: Task

  taskSub!: Subscription;
  formGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>, private taskService: TaskService) {
    this.task = new Task();
  }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  onSubmit(): void {

    if (this.formGroup.invalid) {
      return;
    }

    this.taskSub = this.taskService.save(Object.assign(this.task, this.formGroup.value)).subscribe((result) => {
      console.log(result);
      this.formGroup.reset();
      this.onNoClick();
    })


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
