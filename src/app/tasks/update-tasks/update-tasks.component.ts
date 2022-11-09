import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Task } from '../../model/task';
import { TaskService } from '../../services/task.service';
import { DeleteTasksComponent } from '../delete-tasks/delete-tasks.component';


@Component({
  selector: 'app-update-tasks',
  templateUrl: './update-tasks.component.html',
  styleUrls: ['./update-tasks.component.scss']
})
export class UpdateTasksComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  taskSub!: Subscription;
  task!: Task;

  constructor(
    public taskService: TaskService,
    public dialogRef: MatDialogRef<DeleteTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {element : any}
  ) { this.task = new Task(); }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      id: new FormControl(this.data.element.id),
      title: new FormControl(this.data.element.title, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      description: new FormControl(this.data.element.description, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  onSubmit(): void {

    if (this.formGroup.invalid) {
      return;
    }

    this.taskSub = this.taskService.update(Object.assign(this.task, this.formGroup.value)).subscribe((result) => {
      console.log(result);
      this.formGroup.reset();
      this.onNoClick();
    })


  }

  onNoClick(): void {
    //this.dialogRef.close("User cancelled action");
  }

  ngOnDestroy(): void {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }

}
