import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public findAll() : Observable<Task[]> {
    return this.http.get<Task[]>(apiUrl.taskApi).pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError((err) => {
        console.warn(err);
        return throwError(() => new Error(err));
      })
    )
  }

  public save(task: Task) {
    return this.http.post<Task>(apiUrl.taskApi, task);
  }

  public update(task: Task) {
    return this.http.put<Task>(apiUrl.taskApi, task);
  }

  public remove(taskId: number) {
    return this.http.delete<Task>(apiUrl.taskApi + taskId);
  }

  // For Completed Tasks

  public findAllCompletedTasks() : Observable<Task[]>{
    return this.http.get<Task[]>(apiUrl.taskApi + "completed").pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError((err) => {
        console.warn(err);
        return throwError(() => new Error(err));
      })
    )
  }

  public completeTask(task: Task) {
    return this.http.post<Task>(apiUrl.taskApi + "complete", task);
  }

  public redoTask(taskId: number) {
    return this.http.post<Task>(apiUrl.taskApi + "redo", {id: taskId});
  }

  public deleteCompletedTask(taskId: number) {
    return this.http.delete<Task>(apiUrl.taskApi + "completed/" + taskId)
  }


}
