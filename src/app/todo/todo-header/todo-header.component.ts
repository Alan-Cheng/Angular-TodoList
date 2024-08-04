import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit, AfterViewInit {
  inputValue: string = '';
  @Input() placeholder: string = '輸入待辦事項嗎？';
  @Input() delay: number = 300;

  @Output() textChanges = new EventEmitter<string>();
  @Output() onEnterUp = new EventEmitter<string>();

  constructor(private elementRef: ElementRef, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const inputElement = this.elementRef.nativeElement.querySelector('input');

    if (inputElement) {
      fromEvent(inputElement, 'keyup').pipe(
        map(() => this.inputValue),
        debounceTime(this.delay),
        distinctUntilChanged()
      ).subscribe(input => this.textChanges.emit(input));
    }
  }

  enterUp(): void {
    this.onEnterUp.emit(this.inputValue); // Emit the actual inputValue
    this.inputValue = ''; // Optionally clear input value
  }

  logout(): void {
    // Logic for logging out the user, such as clearing session data or redirecting
    this.router.navigate(['/login']); // Example redirection
  }
}
