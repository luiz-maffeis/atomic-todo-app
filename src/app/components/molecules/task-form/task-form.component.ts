import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent],
  template: `
    <form class="task-form" (ngSubmit)="addTaskAction()" #taskForm="ngForm">
      <div class="task-form__input">
        <app-input
          [(ngModel)]="taskName"
          name="taskName"
          placeholder="What needs to be done?"
          (enterEvent)="addTaskAction()"
          [ariaLabel]="'New task input'"
        >
        </app-input>
      </div>

      <div class="task-form__button">
        <app-button
          type="submit"
          variant="primary"
          [disabled]="!taskName.trim()"
          (action)="addTaskAction()"
        >
          Add Task
        </app-button>
      </div>
    </form>
  `,
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  @Output() addTask = new EventEmitter<string>();

  taskName = '';

  addTaskAction(): void {
    if (this.taskName.trim()) {
      this.addTask.emit(this.taskName.trim());
      this.taskName = '';
    }
  }
}
