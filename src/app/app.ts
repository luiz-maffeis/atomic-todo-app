import { Component } from '@angular/core';
import { TodoPageComponent } from './components/pages/todo-page/todo-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoPageComponent],
  template: `<app-todo-page></app-todo-page>`,
  styles: [],
})
export class AppComponent { }
