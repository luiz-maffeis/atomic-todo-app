import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/todo-page';

test.describe('Todo App E2E Tests (Page Object Model)', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.goto();
    });

    test('should display the todo app with empty state', async () => {
        await todoPage.expectEmptyState();
    });

    test('should add a new task', async () => {
        const taskName = 'Test task for e2e';

        await todoPage.addTask(taskName);

        await todoPage.expectTaskToExist(taskName);
        await todoPage.expectInputToBeEmpty();
        expect(await todoPage.getTaskCount()).toBe(1);
    });

    test('should add multiple tasks', async () => {
        const tasks = ['First task', 'Second task', 'Third task'];

        for (const task of tasks) {
            await todoPage.addTask(task);
        }

        expect(await todoPage.getTaskCount()).toBe(3);

        for (const task of tasks) {
            await todoPage.expectTaskToExist(task);
        }
    });

    test('should complete a task', async () => {
        const taskName = 'Task to complete';

        await todoPage.addTask(taskName);
        await todoPage.completeTask(taskName);

        await todoPage.expectTaskToBeCompleted(taskName);
    });

    test('should toggle task completion', async () => {
        const taskName = 'Task to toggle';

        await todoPage.addTask(taskName);

        // Complete the task
        await todoPage.completeTask(taskName);
        await todoPage.expectTaskToBeCompleted(taskName);

        // Uncomplete the task
        await todoPage.uncompleteTask(taskName);
        await todoPage.expectTaskToNotBeCompleted(taskName);
    });

    test('should edit a task', async () => {
        const originalName = 'Original task name';
        const newName = 'Updated task name';

        await todoPage.addTask(originalName);
        await todoPage.editTask(originalName, newName);

        await todoPage.expectTaskToExist(newName);
        await todoPage.expectTaskToNotExist(originalName);
    });

    test('should remove a task', async () => {
        const taskName = 'Task to remove';

        await todoPage.addTask(taskName);
        expect(await todoPage.getTaskCount()).toBe(1);

        await todoPage.removeTask(taskName);

        expect(await todoPage.getTaskCount()).toBe(0);
        await todoPage.expectEmptyState();
    });

    test('should remove completed tasks', async () => {
        const tasks = ['Task 1', 'Task 2', 'Task 3'];

        for (const task of tasks) {
            await todoPage.addTask(task);
        }

        // Complete first two tasks
        await todoPage.completeTask('Task 1');
        await todoPage.completeTask('Task 2');

        await todoPage.expectProgressCount('2 of 3 completed');

        await todoPage.clearCompletedTasks();

        expect(await todoPage.getTaskCount()).toBe(1);
        await todoPage.expectTaskToExist('Task 3');
        await todoPage.expectTaskToNotExist('Task 1');
        await todoPage.expectTaskToNotExist('Task 2');
    });

    test('should show progress correctly', async () => {
        const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4'];

        for (const task of tasks) {
            await todoPage.addTask(task);
        }

        // Initially, 0 of 4 completed
        await todoPage.expectProgressCount('0 of 4 completed');

        // Complete 2 tasks
        await todoPage.completeTask('Task 1');
        await todoPage.completeTask('Task 2');

        await todoPage.expectProgressCount('2 of 4 completed');

        // Complete all tasks
        await todoPage.completeTask('Task 3');
        await todoPage.completeTask('Task 4');

        await todoPage.expectProgressCount('4 of 4 completed');
    });

    test('should handle empty task input', async () => {
        // Try to add empty task
        await todoPage.addTaskWithButton('');
        await todoPage.expectEmptyState();

        // Try to add task with only spaces
        await todoPage.addTaskWithButton('   ');
        await todoPage.expectEmptyState();
    });

    test('should handle task with special characters', async () => {
        const specialTask = 'Task with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';

        await todoPage.addTask(specialTask);
        await todoPage.expectTaskToExist(specialTask);
    });

    test('should persist tasks across page reload', async ({ page }) => {
        const taskName = 'Persistent task';

        await todoPage.addTask(taskName);
        await todoPage.expectTaskToExist(taskName);

        // Reload the page
        await page.reload();
        await page.waitForLoadState('networkidle');

        // Recreate the page object after reload
        todoPage = new TodoPage(page);
        await todoPage.expectTaskToExist(taskName);
    });

    test('should be responsive on mobile viewport', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        const taskName = 'Mobile test task';
        await todoPage.addTask(taskName);

        await todoPage.expectTaskToExist(taskName);

        // Check that the layout is responsive (task item should be in column layout)
        const taskItem = page.locator('.task-item');
        await expect(taskItem).toHaveCSS('flex-direction', 'column');
    });

    test('should handle button states correctly', async () => {
        // Button should be disabled when input is empty
        await todoPage.taskInput.fill('');
        await todoPage.expectAddButtonToBeDisabled();

        // Button should be enabled when input has content
        await todoPage.taskInput.fill('Valid task');
        await todoPage.expectAddButtonToBeEnabled();

        // Button should be disabled when input has only spaces
        await todoPage.taskInput.fill('   ');
        await todoPage.expectAddButtonToBeDisabled();
    });

    test('should handle keyboard navigation', async () => {
        const taskName = 'Keyboard navigation test';

        // Focus the input and add task with Enter
        await todoPage.taskInput.focus();
        await todoPage.taskInput.fill(taskName);
        await todoPage.taskInput.press('Enter');

        await todoPage.expectTaskToExist(taskName);
        await todoPage.expectInputToBeEmpty();
    });
}); 