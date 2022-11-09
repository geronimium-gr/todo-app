import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageComponent } from '../../components/message/message.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-delete-tasks',
  templateUrl: './delete-tasks.component.html',
  styleUrls: ['./delete-tasks.component.scss']
})
export class DeleteTasksComponent implements OnInit, OnDestroy {

  deleteSub!: Subscription;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {element : any}) { }

  ngOnInit(): void {
  }

  deleteTask() {
    this.deleteSub = this.taskService.remove(this.data.element.id).subscribe((result) => {
      console.log(result);
    });

    this.openDialog("Deleted Successfully", "Item deleted.");
  }

  openDialog(title: string, message: string) {
    this.dialog.open(MessageComponent, {
      width: '250px',
      data: {title: title, subtitle: message}
    })
  }

  onNoClick(): void {
    this.dialogRef.close("User cancelled action");
  }

  ngOnDestroy(): void {
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }

}
