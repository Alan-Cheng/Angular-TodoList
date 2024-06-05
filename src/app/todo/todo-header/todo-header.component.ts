import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit{
  inputValue: string = '';
  @Input() placeholder: string = 'What needs to be done?';
  @Input() delay: number = 300;

  @Output() textChanges = new EventEmitter<string>();
  @Output() onEnterUp = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {
    const event$ = fromEvent(elementRef.nativeElement, 'keyup')
      .pipe(
        map(() => this.inputValue),
        debounceTime(this.delay),
        distinctUntilChanged()
      );
      event$.subscribe(input => this.textChanges.emit(input));
  }

  ngOnInit(): void {
  }

  enterUp(): void {
    this.onEnterUp.emit(true);
    this.inputValue = '';
  }
}
