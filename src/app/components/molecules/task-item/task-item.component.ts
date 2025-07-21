import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.interface';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CheckboxComponent,
    ButtonComponent,
    InputComponent,
  ],
  template: `
    <div
      class="task-item"
      [class.task-item--completed]="task.completed"
      [attr.data-task-id]="task.id"
    >
      <div class="task-item__content">
        <app-checkbox
          [checked]="task.completed"
          (changeEvent)="toggleComplete.emit($event)"
        >
        </app-checkbox>

        <div class="task-item__text" *ngIf="!isEditing">
          <span
            class="task-item__name"
            [class.task-item__name--completed]="task.completed"
            (dblclick)="startEditing()"
          >
            {{ task.name }}
          </span>
          <span class="task-item__date">
            {{ task.updatedAt | date: 'short' }}
          </span>
        </div>

        <div class="task-item__edit" *ngIf="isEditing">
          <app-input
            [value]="editValue"
            [placeholder]="'Edit task...'"
            (inputEvent)="onEditInput($event)"
            (enterEvent)="saveEdit()"
            (blurEvent)="cancelEdit()"
          >
          </app-input>
        </div>
      </div>

      <div class="task-item__actions">
        <app-button
          variant="secondary"
          size="small"
          (action)="startEditing()"
          *ngIf="!isEditing"
        >
          Edit
        </app-button>
        <app-button
          variant="danger"
          size="small"
          (action)="remove.emit(task.id)"
        >
          Remove
        </app-button>
      </div>
    </div>
  `,
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleComplete = new EventEmitter<Event>();
  @Output() update = new EventEmitter<{ id: string; name: string }>();
  @Output() remove = new EventEmitter<string>();

  isEditing = false;
  editValue = '';

  startEditing(): void {
    this.isEditing = true;
    this.editValue = this.task.name;
  }

  onEditInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editValue = target.value;
  }

  saveEdit(): void {
    if (this.editValue.trim()) {
      this.update.emit({ id: this.task.id, name: this.editValue });
      this.isEditing = false;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editValue = this.task.name;
  }
}
