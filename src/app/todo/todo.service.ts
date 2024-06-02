import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { UUID } from 'angular2-uuid';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private api_url = 'api/todos';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  addTodo(desc: string): Promise<Todo> {
    let id = UUID.UUID();
    let todo = {id: id, desc: desc, completed: false};
    return this.http.post(this.api_url, todo)
      .toPromise()
      .then(response => response as Todo)
      .catch(this.handleError);
  }

  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
    return this.http.put(url, updatedTodo)
      .toPromise()
      .then(() => updatedTodo)
      .catch(this.handleError);
  }

  deleteTodoById(id: string): Promise<null> {
    const url = `${this.api_url}/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.api_url);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  clearCompleted(todos: Todo[]): Promise<Todo[]> {
    let completedTodos = todos.filter(todo => todo.completed);
    let promises = completedTodos.map(todo => this.deleteTodoById(todo.id));
    return Promise.all(promises).then(() => todos.filter(todo => !todo.completed));
  }
}
