import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  todos: Todo[] = [];
  desc: string = '';
  constructor() {}

  ngOnInit(): void {
      
  }

  addTodo() {
    this.todos.push({id: 1, desc: this.desc, complete: false});
  }
}
