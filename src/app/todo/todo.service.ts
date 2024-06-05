import { Injectable } from '@angular/core';
import { Todo } from '../domain/entities';
import { UUID } from 'angular2-uuid';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private api_url = 'http://localhost:4000/todos';

  constructor(private http: HttpClient) { }

  addTodo(desc: string): Observable<Todo> {
    const userId: number = +localStorage.getItem('userId')!;
    let todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId
    };
    return this.http.post<Todo>(this.api_url, todo)
      .pipe(catchError(this.handleError));
  }

  toggleTodo(todo: Todo): Observable<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    let updatedTodo = { ...todo, completed: !todo.completed };
    return this.http.put<Todo>(url, updatedTodo)
      .pipe(
        map(() => updatedTodo),
        catchError(this.handleError)
      );
  }

  deleteTodoById(id: string): Observable<null> {
    const url = `${this.api_url}/${id}`;
    return this.http.delete<null>(url)
      .pipe(catchError(this.handleError));
  }

  getTodos(): Observable<Todo[]> {
    const userId: number = +localStorage.getItem('userId')!;
    const url = `${this.api_url}?userId=${userId}`;
    console.log(url);
    return this.http.get<Todo[]>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }

  clearCompleted(todos: Todo[]): Observable<Todo[]> {
    let completedTodos = todos.filter(todo => todo.completed);
    let deleteRequests = completedTodos.map(todo => this.deleteTodoById(todo.id));

    return forkJoin(deleteRequests)
      .pipe(
        map(() => todos.filter(todo => !todo.completed)),
        catchError(this.handleError)
      );
  }

  filterTodos(filter: string): Observable<Todo[]> {
    const userId: number = +localStorage.getItem('userId')!;
    const url = `${this.api_url}?userId=${userId}`;
    switch(filter) {
      case 'ACTIVE':
        return this.http.get<Todo[]>(url)
          .pipe(
            map(todos => todos.filter(todo => !todo.completed)),
            catchError(this.handleError)
          );
      case 'COMPLETED':
        return this.http.get<Todo[]>(url)
          .pipe(
            map(todos => todos.filter(todo => todo.completed)),
            catchError(this.handleError)
          );
      default:
        return this.http.get<Todo[]>(url)
          .pipe(catchError(this.handleError));
      }
  }
}
