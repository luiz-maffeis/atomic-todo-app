import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo-template">
      <header class="todo-template__header">
        <div class="todo-template__container">
          <h1 class="todo-template__title">
            <span class="todo-template__icon">⚡</span>
            Atomic Todo
          </h1>
          <p class="todo-template__subtitle">
            Built with Atomic Design principles
          </p>
        </div>
      </header>

      <main class="todo-template__main">
        <div class="todo-template__container">
          <ng-content></ng-content>
        </div>
      </main>

      <footer class="todo-template__footer">
        <div class="todo-template__container">
          <p class="todo-template__footer-text">
            Made with ❤️ using Angular & Atomic Design
          </p>
        </div>
      </footer>
    </div>
  `,
  styleUrls: ['./todo-template.component.css'],
})
export class TodoTemplateComponent {}
