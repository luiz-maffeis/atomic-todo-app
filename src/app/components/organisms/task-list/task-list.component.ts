import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.interface';
import { TaskItemComponent } from '../../molecules/task-item/task-item.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, ButtonComponent],
  template: `
    <div class="task-list">
      <div class="task-list__header" *ngIf="tasks.length > 0">
        <div class="task-list__stats">
          <span class="task-list__count">
            {{ completedCount }} of {{ tasks.length }} completed
          </span>
          <div class="task-list__progress">
            <div
              class="task-list__progress-bar"
              [style.width.%]="progressPercentage"
            ></div>
          </div>
        </div>

        <app-button
          variant="danger"
          size="small"
          [disabled]="completedCount === 0"
          (action)="removeCompleted.emit()"
        >
          Clear Completed
        </app-button>
      </div>

      <div class="task-list__content">
        <app-task-item
          *ngFor="let task of tasks; trackBy: trackByTaskId"
          [task]="task"
          (toggleComplete)="toggleComplete.emit($event)"
          (update)="update.emit($event)"
          (remove)="remove.emit($event)"
        >
        </app-task-item>
      </div>

      <div class="task-list__empty" *ngIf="tasks.length === 0">
        <div class="task-list__empty-icon">📝</div>
        <h3 class="task-list__empty-title">No tasks yet</h3>
        <p class="task-list__empty-text">Add your first task to get started!</p>
      </div>
    </div>
  `,
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() toggleComplete = new EventEmitter<Event>();
  @Output() update = new EventEmitter<{ id: string; name: string }>();
  @Output() remove = new EventEmitter<string>();
  @Output() removeCompleted = new EventEmitter<void>();

  get completedCount(): number {
    return this.tasks.filter((task) => task.completed).length;
  }

  get progressPercentage(): number {
    return this.tasks.length > 0
      ? (this.completedCount / this.tasks.length) * 100
      : 0;
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
