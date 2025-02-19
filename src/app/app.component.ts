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
    this.todosService.getTodos().subscribe((todos) => {
      console.log(todos);
      this.todos = todos;
    });
  }

  loadTodos() {
    this.todosService.getTodos()
      .subscribe((todos) => {
        this.todos = todos;
      })
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle).subscribe((newTodo) => {
      this.todos = [...this.todos, newTodo];
    });
  }

  renameTodo(id: number, newTitle: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return { ...todo, title: newTitle };
    });
  }

  toggleTodo(todoId: number) {
    this.todos = this.todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    });
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }
}
