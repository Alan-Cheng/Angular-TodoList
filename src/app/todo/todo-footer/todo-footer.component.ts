import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css'
})
export class TodoFooterComponent {
  @Input() itemCount: number = 0;
  @Output() onClear = new EventEmitter<boolean>();

  constructor() { }

  onClick() {
    this.onClear.emit(true);
  }
}
