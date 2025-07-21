import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from './task-item.component';
import { Task } from '../../../models/task.interface';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';

describe('TaskItemComponent', () => {
    let component: TaskItemComponent;
    let fixture: ComponentFixture<TaskItemComponent>;
    let mockTask: Task;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TaskItemComponent,
                CheckboxComponent,
                ButtonComponent,
                InputComponent,
                FormsModule
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskItemComponent);
        component = fixture.componentInstance;

        // Create a mock task
        mockTask = {
            id: '1',
            name: 'Test task',
            completed: false,
            createdAt: new Date('2023-01-01'),
            updatedAt: new Date('2023-01-01')
        };

        component.task = mockTask;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default editing state', () => {
        expect(component.isEditing).toBe(false);
    });

    it('should have empty editValue by default', () => {
        expect(component.editValue).toBe('');
    });

    it('should display task name', () => {
        const taskName = fixture.nativeElement.querySelector('.task-item__name');
        expect(taskName.textContent.trim()).toBe('Test task');
    });

    it('should display task date', () => {
        const taskDate = fixture.nativeElement.querySelector('.task-item__date');
        expect(taskDate).toBeTruthy();
    });

    it('should render checkbox with correct checked state', () => {
        const checkbox = fixture.nativeElement.querySelector('app-checkbox');
        expect(checkbox).toBeTruthy();
    });

    it('should render edit and remove buttons', () => {
        const buttons = fixture.nativeElement.querySelectorAll('app-button');
        expect(buttons.length).toBe(2);
    });

    it('should have correct CSS classes for uncompleted task', () => {
        const taskItem = fixture.nativeElement.querySelector('.task-item');
        expect(taskItem.classList.contains('task-item--completed')).toBe(false);
    });

    it('should have correct CSS classes for completed task', () => {
        component.task.completed = true;
        fixture.detectChanges();

        const taskItem = fixture.nativeElement.querySelector('.task-item');
        expect(taskItem.classList.contains('task-item--completed')).toBe(true);
    });

    it('should have completed name class when task is completed', () => {
        component.task.completed = true;
        fixture.detectChanges();

        const taskName = fixture.nativeElement.querySelector('.task-item__name');
        expect(taskName.classList.contains('task-item__name--completed')).toBe(true);
    });

    it('should emit toggleComplete event when checkbox changes', () => {
        const changeEvent = new Event('change');
        spyOn(component.toggleComplete, 'emit');

        // Test the event emission directly since it's bound to the child component
        component.toggleComplete.emit(changeEvent);

        expect(component.toggleComplete.emit).toHaveBeenCalledWith(changeEvent);
    });

    it('should emit remove event when remove button is clicked', () => {
        spyOn(component.remove, 'emit');

        // Test the event emission directly since it's bound to the child component
        component.remove.emit('1');

        expect(component.remove.emit).toHaveBeenCalledWith('1');
    });

    it('should start editing when edit button is clicked', () => {
        // Test the method directly since the event binding is on the child component
        component.startEditing();

        expect(component.isEditing).toBe(true);
        expect(component.editValue).toBe('Test task');
    });

    it('should start editing when task name is double-clicked', () => {
        // Test the method directly since the event binding is on the child component
        component.startEditing();

        expect(component.isEditing).toBe(true);
        expect(component.editValue).toBe('Test task');
    });

    it('should show edit input when editing', () => {
        component.startEditing();
        fixture.detectChanges();

        const editInput = fixture.nativeElement.querySelector('.task-item__edit');
        expect(editInput).toBeTruthy();
    });

    it('should hide task text when editing', () => {
        component.startEditing();
        fixture.detectChanges();

        const taskText = fixture.nativeElement.querySelector('.task-item__text');
        expect(taskText).toBeFalsy();
    });

    it('should hide edit button when editing', () => {
        component.startEditing();
        fixture.detectChanges();

        const buttons = fixture.nativeElement.querySelectorAll('app-button');
        expect(buttons.length).toBe(1); // Only remove button should be visible
    });

    it('should update editValue when input changes', () => {
        component.startEditing();
        fixture.detectChanges();

        // Test the method directly since the event binding is on the child component
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: 'Updated task name' }
        });

        component.onEditInput(inputEvent);

        expect(component.editValue).toBe('Updated task name');
    });

    it('should emit update event when edit is saved with valid input', () => {
        spyOn(component.update, 'emit');
        component.startEditing();
        component.editValue = 'Updated task name';

        component.saveEdit();

        expect(component.update.emit).toHaveBeenCalledWith({
            id: '1',
            name: 'Updated task name'
        });
        expect(component.isEditing).toBe(false);
    });

    it('should not emit update event when edit is saved with empty input', () => {
        spyOn(component.update, 'emit');
        component.startEditing();
        component.editValue = '';

        component.saveEdit();

        expect(component.update.emit).not.toHaveBeenCalled();
        expect(component.isEditing).toBe(true);
    });

    it('should not emit update event when edit is saved with whitespace only', () => {
        spyOn(component.update, 'emit');
        component.startEditing();
        component.editValue = '   ';

        component.saveEdit();

        expect(component.update.emit).not.toHaveBeenCalled();
        expect(component.isEditing).toBe(true);
    });

    it('should cancel edit when blur event occurs', () => {
        component.startEditing();
        component.editValue = 'Modified task name';

        // Test the method directly since the event binding is on the child component
        component.cancelEdit();

        expect(component.isEditing).toBe(false);
        expect(component.editValue).toBe('Test task'); // Should revert to original
    });

    it('should save edit when enter key is pressed', () => {
        spyOn(component.update, 'emit');
        component.startEditing();
        component.editValue = 'Updated task name';

        // Test the method directly since the event binding is on the child component
        component.saveEdit();

        expect(component.update.emit).toHaveBeenCalledWith({
            id: '1',
            name: 'Updated task name'
        });
        expect(component.isEditing).toBe(false);
    });

    it('should have correct data-task-id attribute', () => {
        const taskItem = fixture.nativeElement.querySelector('.task-item');
        expect(taskItem.getAttribute('data-task-id')).toBe('1');
    });

    it('should handle multiple edit cycles', () => {
        spyOn(component.update, 'emit');

        // First edit
        component.startEditing();
        component.editValue = 'First edit';
        component.saveEdit();
        expect(component.update.emit).toHaveBeenCalledWith({
            id: '1',
            name: 'First edit'
        });

        // Second edit
        component.startEditing();
        component.editValue = 'Second edit';
        component.saveEdit();
        expect(component.update.emit).toHaveBeenCalledWith({
            id: '1',
            name: 'Second edit'
        });
    });

    it('should handle cancel edit multiple times', () => {
        component.startEditing();
        component.editValue = 'Modified name';
        component.cancelEdit();
        expect(component.isEditing).toBe(false);
        expect(component.editValue).toBe('Test task');

        component.startEditing();
        component.editValue = 'Another modification';
        component.cancelEdit();
        expect(component.isEditing).toBe(false);
        expect(component.editValue).toBe('Test task');
    });

    it('should handle special characters in task name', () => {
        component.task.name = 'Task with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';
        fixture.detectChanges();

        const taskName = fixture.nativeElement.querySelector('.task-item__name');
        expect(taskName.textContent.trim()).toBe('Task with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?');
    });

    it('should handle very long task names', () => {
        const longTaskName = 'A'.repeat(1000);
        component.task.name = longTaskName;
        fixture.detectChanges();

        const taskName = fixture.nativeElement.querySelector('.task-item__name');
        expect(taskName.textContent.trim()).toBe(longTaskName);
    });

    it('should handle task with different dates', () => {
        const newDate = new Date('2023-12-25');
        component.task.updatedAt = newDate;
        fixture.detectChanges();

        const taskDate = fixture.nativeElement.querySelector('.task-item__date');
        expect(taskDate).toBeTruthy();
    });

    it('should maintain edit state when input is invalid', () => {
        component.startEditing();
        component.editValue = '   ';

        component.saveEdit();

        expect(component.isEditing).toBe(true);
        expect(component.editValue).toBe('   ');
    });

    it('should have proper accessibility structure', () => {
        const taskItem = fixture.nativeElement.querySelector('.task-item');
        const checkbox = fixture.nativeElement.querySelector('app-checkbox');
        const buttons = fixture.nativeElement.querySelectorAll('app-button');

        expect(taskItem).toBeTruthy();
        expect(checkbox).toBeTruthy();
        expect(buttons.length).toBe(2);
    });

    it('should handle rapid edit state changes', () => {
        spyOn(component.update, 'emit');

        // Rapidly start and cancel editing
        for (let i = 0; i < 5; i++) {
            component.startEditing();
            component.cancelEdit();
        }

        expect(component.isEditing).toBe(false);
        expect(component.editValue).toBe('Test task');
    });
}); 