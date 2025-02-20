import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';
import { Todo } from './types/todo';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { FilterActivePipe } from './pipes/filter-active.pipe';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoComponent,
    TodoFormComponent,
    FilterActivePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService.todos$.subscribe((todos) => {
      this.todos = todos;
    });
  }

  // loadTodos() {
  //   this.todosService.todos$
  //     .subscribe((todos) => {
  //       this.todos = todos;
  //     })
  // }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle).subscribe();
  }

  renameTodo(todo: Todo, title: string) {
    this.todosService.updateTodo({ ...todo, title })
      .subscribe();
    // this.todos = this.todos.map((todo) => {
    //   if (todo.id !== id) {
    //     return todo;
    //   }

    //   return { ...todo, title: newTitle };
    // });
  }

  toggleTodo(todo: Todo) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed })
      .subscribe();
  }

  deleteTodo(todo: Todo) {
    // this.todos = this.todos.filter((todo) => todo.id !== todoId);

    this.todosService.deleteTodo(todo).subscribe();
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }
}
