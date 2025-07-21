import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();
  private readonly STORAGE_KEY = 'atomic-todo-tasks';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTasksFromStorage();
    }
  }

  private loadTasksFromStorage(): void {
    const storedTasks = this.getStorage().getItem(this.STORAGE_KEY);
    if (storedTasks) {
      try {
        const tasks = JSON.parse(storedTasks).map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        this.tasksSubject.next(tasks);
      } catch (error) {
        console.error('Error loading tasks from storage:', error);
        this.tasksSubject.next([]);
      }
    }
  }

  private getStorage(): Storage {
    if (typeof localStorage !== 'undefined') {
      return localStorage;
    } else if (typeof sessionStorage !== 'undefined') {
      return sessionStorage;
    } else {
      throw new Error('No storage available');
    }
  }

  private saveTasksToStorage(tasks: Task[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } else {
      console.error('No storage available');
    }
  }

  addTask(name: string): void {
    const newTask: Task = {
      id: this.generateId(),
      name: name.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const currentTasks = this.tasksSubject.value;
    const updatedTasks = [...currentTasks, newTask];
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToStorage(updatedTasks);
  }

  toggleTask(id: string): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task,
    );
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToStorage(updatedTasks);
  }

  updateTask(id: string, name: string): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map((task) =>
      task.id === id
        ? { ...task, name: name.trim(), updatedAt: new Date() }
        : task,
    );
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToStorage(updatedTasks);
  }

  removeCompletedTasks(): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter((task) => !task.completed);
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToStorage(updatedTasks);
  }

  removeTask(id: string): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter((task) => task.id !== id);
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToStorage(updatedTasks);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getCompletedTasksCount(): Observable<number> {
    return new Observable((observer) => {
      this.tasks$.subscribe((tasks) => {
        observer.next(tasks.filter((task) => task.completed).length);
      });
    });
  }

  getTotalTasksCount(): Observable<number> {
    return new Observable((observer) => {
      this.tasks$.subscribe((tasks) => {
        observer.next(tasks.length);
      });
    });
  }
}
