import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.interface';

describe('TaskService', () => {
    let service: TaskService;
    let mockLocalStorage: { [key: string]: string } = {};

    beforeEach(() => {
        // Mock localStorage
        spyOn(localStorage, 'getItem').and.callFake(
            (key: string) => mockLocalStorage[key] || null,
        );
        spyOn(localStorage, 'setItem').and.callFake(
            (key: string, value: string) => {
                mockLocalStorage[key] = value;
            },
        );

        TestBed.configureTestingModule({});
        service = TestBed.inject(TaskService);
    });

    afterEach(() => {
        mockLocalStorage = {};
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a new task', (done) => {
        const taskName = 'Test task';

        service.tasks$.subscribe((tasks) => {
            if (tasks.length > 0) {
                expect(tasks[0].name).toBe(taskName);
                expect(tasks[0].completed).toBe(false);
                expect(tasks[0].id).toBeTruthy();
                expect(tasks[0].createdAt).toBeInstanceOf(Date);
                expect(tasks[0].updatedAt).toBeInstanceOf(Date);
                done();
            }
        });

        service.addTask(taskName);
    });

    it('should toggle task completion', (done) => {
        const taskName = 'Test task';
        let taskId: string;

        service.tasks$.subscribe((tasks) => {
            if (tasks.length > 0 && !taskId) {
                taskId = tasks[0].id;
                expect(tasks[0].completed).toBe(false);

                // Toggle the task
                service.toggleTask(taskId);
            } else if (tasks.length > 0 && taskId) {
                const task = tasks.find((t) => t.id === taskId);
                if (task) {
                    expect(task.completed).toBe(true);
                    done();
                }
            }
        });

        service.addTask(taskName);
    });

    it('should update task name', (done) => {
        const originalName = 'Original task';
        const newName = 'Updated task';
        let taskId: string;

        service.tasks$.subscribe((tasks) => {
            if (tasks.length > 0 && !taskId) {
                taskId = tasks[0].id;
                expect(tasks[0].name).toBe(originalName);

                // Update the task
                service.updateTask(taskId, newName);
            } else if (tasks.length > 0 && taskId) {
                const task = tasks.find((t) => t.id === taskId);
                if (task && task.name === newName) {
                    expect(task.name).toBe(newName);
                    done();
                }
            }
        });

        service.addTask(originalName);
    });

    it('should remove a task', (done) => {
        const taskName = 'Test task';
        let taskId: string;
        let initialTaskCount = 0;

        service.tasks$.subscribe((tasks) => {
            if (tasks.length > 0 && !taskId) {
                taskId = tasks[0].id;
                initialTaskCount = tasks.length;

                // Remove the task
                service.removeTask(taskId);
            } else if (tasks.length === initialTaskCount - 1) {
                expect(tasks.length).toBe(initialTaskCount - 1);
                expect(tasks.find((t) => t.id === taskId)).toBeUndefined();
                done();
            }
        });

        service.addTask(taskName);
    });

    it('should remove completed tasks', (done) => {
        const task1 = 'Task 1';
        const task2 = 'Task 2';
        let task1Id: string;
        let task2Id: string;
        let completedCount = 0;

        service.tasks$.subscribe((tasks) => {
            if (tasks.length === 2 && !task1Id) {
                task1Id = tasks[0].id;
                task2Id = tasks[1].id;

                // Complete both tasks
                service.toggleTask(task1Id);
                service.toggleTask(task2Id);
            } else if (tasks.length === 2 && completedCount === 0) {
                completedCount = tasks.filter((t) => t.completed).length;
                if (completedCount === 2) {
                    // Remove completed tasks
                    service.removeCompletedTasks();
                }
            } else if (tasks.length === 0) {
                expect(tasks.length).toBe(0);
                done();
            }
        });

        service.addTask(task1);
        service.addTask(task2);
    });

    it('should persist tasks to localStorage', (done) => {
        const taskName = 'Test task for persistence';

        service.tasks$.subscribe((tasks) => {
            if (tasks.length > 0) {
                // Wait a bit for the async localStorage operation
                setTimeout(() => {
                    // Verify the task was saved to localStorage
                    expect(mockLocalStorage['atomic-todo-tasks']).toBeTruthy();
                    const savedTasks = JSON.parse(mockLocalStorage['atomic-todo-tasks']);
                    expect(savedTasks.length).toBe(1);
                    expect(savedTasks[0].name).toBe(taskName);
                    done();
                }, 100);
            }
        });

        service.addTask(taskName);
    });
});
