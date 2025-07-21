import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoPageComponent } from './todo-page.component';
import { TaskService } from '../../../services/task.service';
import { TodoTemplateComponent } from '../../templates/todo-template/todo-template.component';
import { TaskFormComponent } from '../../molecules/task-form/task-form.component';
import { TaskListComponent } from '../../organisms/task-list/task-list.component';
import { Task } from '../../../models/task.interface';
import { BehaviorSubject } from 'rxjs';

describe('TodoPageComponent', () => {
    let component: TodoPageComponent;
    let fixture: ComponentFixture<TodoPageComponent>;
    let mockTaskService: jasmine.SpyObj<TaskService>;
    let mockTasksSubject: BehaviorSubject<Task[]>;

    const mockTasks: Task[] = [
        {
            id: '1',
            name: 'Task 1',
            completed: false,
            createdAt: new Date('2023-01-01'),
            updatedAt: new Date('2023-01-01')
        },
        {
            id: '2',
            name: 'Task 2',
            completed: true,
            createdAt: new Date('2023-01-02'),
            updatedAt: new Date('2023-01-02')
        }
    ];

    beforeEach(async () => {
        mockTasksSubject = new BehaviorSubject<Task[]>(mockTasks);

        mockTaskService = jasmine.createSpyObj('TaskService', [
            'addTask',
            'toggleTask',
            'updateTask',
            'removeTask',
            'removeCompletedTasks'
        ], {
            tasks$: mockTasksSubject.asObservable()
        });

        await TestBed.configureTestingModule({
            imports: [
                TodoPageComponent,
                TodoTemplateComponent,
                TaskFormComponent,
                TaskListComponent
            ],
            providers: [
                { provide: TaskService, useValue: mockTaskService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TodoPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with tasks from service', () => {
        expect(component.tasks).toEqual(mockTasks);
    });

    it('should call addTask on service when addTask is called', () => {
        const taskName = 'New Task';
        component.addTask(taskName);

        expect(mockTaskService.addTask).toHaveBeenCalledWith(taskName);
    });

    it('should call toggleTask on service when toggleTask is called with valid task ID', () => {
        const mockEvent = {
            target: {
                closest: jasmine.createSpy('closest').and.returnValue({
                    getAttribute: jasmine.createSpy('getAttribute').and.returnValue('1')
                })
            }
        } as any;

        component.toggleTask(mockEvent);

        expect(mockTaskService.toggleTask).toHaveBeenCalledWith('1');
    });

    it('should not call toggleTask on service when toggleTask is called without task ID', () => {
        const mockEvent = {
            target: {
                closest: jasmine.createSpy('closest').and.returnValue({
                    getAttribute: jasmine.createSpy('getAttribute').and.returnValue(null)
                })
            }
        } as any;

        component.toggleTask(mockEvent);

        expect(mockTaskService.toggleTask).not.toHaveBeenCalled();
    });

    it('should call updateTask on service when updateTask is called', () => {
        const updateData = { id: '1', name: 'Updated Task' };
        component.updateTask(updateData);

        expect(mockTaskService.updateTask).toHaveBeenCalledWith('1', 'Updated Task');
    });

    it('should call removeTask on service when removeTask is called', () => {
        const taskId = '1';
        component.removeTask(taskId);

        expect(mockTaskService.removeTask).toHaveBeenCalledWith(taskId);
    });

    it('should call removeCompletedTasks on service when removeCompletedTasks is called', () => {
        component.removeCompletedTasks();

        expect(mockTaskService.removeCompletedTasks).toHaveBeenCalled();
    });

    it('should render todo template', () => {
        const todoTemplate = fixture.nativeElement.querySelector('app-todo-template');
        expect(todoTemplate).toBeTruthy();
    });

    it('should render task form', () => {
        const taskForm = fixture.nativeElement.querySelector('app-task-form');
        expect(taskForm).toBeTruthy();
    });

    it('should render task list', () => {
        const taskList = fixture.nativeElement.querySelector('app-task-list');
        expect(taskList).toBeTruthy();
    });

    it('should update tasks when service emits new tasks', () => {
        const newTasks: Task[] = [
            {
                id: '3',
                name: 'New Task',
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        mockTasksSubject.next(newTasks);
        fixture.detectChanges();

        expect(component.tasks).toEqual(newTasks);
    });

    it('should handle service subscription cleanup on destroy', () => {
        spyOn(component['subscription'], 'unsubscribe');

        component.ngOnDestroy();

        expect(component['subscription'].unsubscribe).toHaveBeenCalled();
    });

    it('should handle empty task name in addTask', () => {
        component.addTask('');

        expect(mockTaskService.addTask).toHaveBeenCalledWith('');
    });

    it('should handle special characters in task name', () => {
        const specialName = 'Task with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';
        component.addTask(specialName);

        expect(mockTaskService.addTask).toHaveBeenCalledWith(specialName);
    });

    it('should handle task update with empty name', () => {
        const updateData = { id: '1', name: '' };
        component.updateTask(updateData);

        expect(mockTaskService.updateTask).toHaveBeenCalledWith('1', '');
    });

    it('should handle empty tasks array from service', () => {
        mockTasksSubject.next([]);
        fixture.detectChanges();

        expect(component.tasks).toEqual([]);
    });

    it('should handle tasks with unicode characters', () => {
        const unicodeTasks: Task[] = [
            {
                id: '1',
                name: 'Task with unicode: 世界 🌍',
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        mockTasksSubject.next(unicodeTasks);
        fixture.detectChanges();

        expect(component.tasks).toEqual(unicodeTasks);
    });

    it('should handle many tasks efficiently', () => {
        const manyTasks: Task[] = Array.from({ length: 100 }, (_, i) => ({
            id: `${i + 1}`,
            name: `Task ${i + 1}`,
            completed: i % 2 === 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        mockTasksSubject.next(manyTasks);
        fixture.detectChanges();

        expect(component.tasks).toEqual(manyTasks);
        expect(component.tasks.length).toBe(100);
    });
}); 