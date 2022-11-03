import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

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
}
