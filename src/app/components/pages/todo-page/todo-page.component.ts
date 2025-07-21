import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Task } from '../../../models/task.interface';
import { TaskService } from '../../../services/task.service';
import { TodoTemplateComponent } from '../../templates/todo-template/todo-template.component';
import { TaskFormComponent } from '../../molecules/task-form/task-form.component';
import { TaskListComponent } from '../../organisms/task-list/task-list.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    CommonModule,
    TodoTemplateComponent,
    TaskFormComponent,
    TaskListComponent,
  ],
  template: `
    <app-todo-template>
      <app-task-form (addTask)="addTask($event)"> </app-task-form>

      <app-task-list
        [tasks]="tasks"
        (toggleComplete)="toggleTask($event)"
        (update)="updateTask($event)"
        (remove)="removeTask($event)"
        (removeCompleted)="removeCompletedTasks()"
      >
      </app-task-list>
    </app-todo-template>
  `,
  styleUrls: ['./todo-page.component.css'],
})
export class TodoPageComponent implements OnInit, OnDestroy {
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  private subscription: Subscription = new Subscription();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor() {}

  ngOnInit(): void {
    this.subscription.add(
      this.taskService.tasks$.subscribe((tasks) => {
        this.tasks = tasks;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addTask(name: string): void {
    this.taskService.addTask(name);
  }

  toggleTask(event: Event): void {
    // The event comes from the checkbox change, we need to get the task ID
    const checkbox = event.target as HTMLInputElement;
    const taskItem = checkbox.closest('.task-item');
    const taskId = taskItem?.getAttribute('data-task-id');

    if (taskId) {
      this.taskService.toggleTask(taskId);
    }
  }

  updateTask(updateData: { id: string; name: string }): void {
    this.taskService.updateTask(updateData.id, updateData.name);
  }

  removeTask(taskId: string): void {
    this.taskService.removeTask(taskId);
  }

  removeCompletedTasks(): void {
    this.taskService.removeCompletedTasks();
  }
}
