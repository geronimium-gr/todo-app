import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-delete-tasks',
  templateUrl: './delete-tasks.component.html',
  styleUrls: ['./delete-tasks.component.scss']
})
export class DeleteTasksComponent implements OnInit {

  constructor(private taskService: TaskService, @Inject(MAT_DIALOG_DATA) public data: {element : any}) { }

  ngOnInit(): void {
  }

  deleteTask() {
    this.taskService.remove(this.data.element.id).subscribe((result) => {
      console.log(result);

    })
  }

}
