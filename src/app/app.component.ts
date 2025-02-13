import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoComponent } from "./components/todo/todo.component";
import { Todo } from './types/todo';

const todos = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: true },
];

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
[x: string]: any;
  todos = todos;
  
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  // handleTodoToggle(event: Event, todo: Todo) {
  //   todo.completed = (event.target as HTMLInputElement).checked;
  // }

  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  get title() {
    return this.todoForm.get("title") as FormControl;
  }

  addTodo() {
    if (this.todoForm.invalid) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.title.value,
      completed: false,
    };

    this.todos.push(newTodo);
    this.todoForm.reset();
  }
}
