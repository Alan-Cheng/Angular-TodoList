import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from '../domain/entities';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc: string = '';

  constructor(private service: TodoService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let filter = params['filter'];
      this.filterTodos(filter);
    });
  }

  addTodo() {
    this.service.addTodo(this.desc).subscribe(todo => {
      this.todos = [...this.todos, todo];
      this.desc = '';
    });
  }

  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service.toggleTodo(todo).subscribe(t => {
      this.todos = [
        ...this.todos.slice(0, i),
        t,
        ...this.todos.slice(i + 1)
      ];
    });
  }

  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service.deleteTodoById(todo.id).subscribe(() => {
      this.todos = [
        ...this.todos.slice(0, i),
        ...this.todos.slice(i + 1)
      ];
    });
  }

  filterTodos(filter: string) {
    this.service.filterTodos(filter).subscribe(todos => this.todos = todos);
  }

  onTextChanges(value: string) {
    this.desc = value;
  }

  onEnterUp(value: string) {
    this.desc = value;
    this.addTodo(); // Add todo with the input value
  }

  clearCompleted() {
    this.service.clearCompleted(this.todos).subscribe(todos => this.todos = todos);
  }
}
