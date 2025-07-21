import { test, expect } from '@playwright/test';

test.describe('Todo App E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the app and wait for it to load
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    });

    test('should display the todo app with empty state', async ({ page }) => {
        // Check that the app loads correctly
        await expect(page.locator('app-todo-page')).toBeVisible();

        // Check for empty state message
        await expect(page.locator('.task-list__empty')).toBeVisible();
        await expect(page.locator('.task-list__empty-title')).toHaveText('No tasks yet');
        await expect(page.locator('.task-list__empty-text')).toHaveText('Add your first task to get started!');
    });

    test('should add a new task', async ({ page }) => {
        const taskName = 'Test task for e2e';

        // Find the input field and add a task
        const input = page.locator('app-input input[placeholder="What needs to be done?"]');
        await input.fill(taskName);
        await input.press('Enter');

        // Verify the task was added
        await expect(page.locator('.task-item__name')).toHaveText(taskName);
        await expect(page.locator('.task-item')).toHaveCount(1);

        // Verify the input is cleared
        await expect(input).toHaveValue('');
    });

    test('should add multiple tasks', async ({ page }) => {
        const tasks = ['First task', 'Second task', 'Third task'];

        // Add multiple tasks
        for (const task of tasks) {
            const input = page.locator('app-input input[placeholder="What needs to be done?"]');
            await input.fill(task);
            await input.press('Enter');
        }

        // Verify all tasks were added
        await expect(page.locator('.task-item')).toHaveCount(3);

        // Verify each task name
        for (let i = 0; i < tasks.length; i++) {
            await expect(page.locator('.task-item__name').nth(i)).toHaveText(tasks[i]);
        }
    });

    test('should complete a task', async ({ page }) => {
        // Add a task first
        const input = page.locator('app-input input[placeholder="What needs to be done?"]');
        await input.fill('Task to complete');
        await input.press('Enter');

        // Find the checkbox and click it
        const checkbox = page.locator('.task-item input[type="checkbox"]').first();
        await checkbox.check();

        // Verify the task is marked as completed
        await expect(page.locator('.task-item--completed')).toBeVisible();
        await expect(page.locator('.task-item__name--completed')).toBeVisible();
    });

    test('should toggle task completion', async ({ page }) => {
        // Add a task first
        const input = page.locator('app-input input[placeholder="What needs to be done?"]');
        await input.fill('Task to toggle');
        await input.press('Enter');

        const checkbox = page.locator('.task-item input[type="checkbox"]').first();

        // Complete the task
        await checkbox.check();
        await expect(page.locator('.task-item--completed')).toBeVisible();

        // Uncomplete the task
        await checkbox.uncheck();
        await expect(page.locator('.task-item--completed')).not.toBeVisible();
    });

    test('should edit a task', async ({ page }) => {
        // Add a task first
        const input = page.locator('app-input input[placeholder="What needs to be done?"]');
        await input.fill('Original task name');
        await input.press('Enter');

        // Click the edit button
        const editButton = page.locator('button:has-text("Edit")').first();
        await editButton.click();

        // Edit the task
        const editInput = page.locator('.task-item__edit input');
        await editInput.clear();
        await editInput.fill('Updated task name');
        await editInput.press('Enter');

        // Verify the task was updated
        await expect(page.locator('.task-item__name')).toHaveText('Updated task name');
    });

    test('should remove a task', async ({ page }) => {
        // Add a task first
        const input = page.locator('app-input input[placeholder="What needs to be done?"]');
        await input.fill('Task to remove');
        await input.press('Enter');

        // Verify task exists
        await expect(page.locator('.task-item')).toHaveCount(1);

        // Click the remove button
        const removeButton = page.locator('button:has-text("Remove")').first();
        await removeButton.click();

        // Verify task was removed
        await expect(page.locator('.task-item')).toHaveCount(0);
        await expect(page.locator('.task-list__empty')).toBeVisible();
    });

    test('should remove completed tasks', async ({ page }) => {
        // Add multiple tasks
        const tasks = ['Task 1', 'Task 2', 'Task 3'];
        for (const task of tasks) {
            const input = page.locator('app-input input[placeholder="What needs to be done?"]');
            await input.fill(task);
            await input.press('Enter');
        }

        // Complete first two tasks
        const checkboxes = page.locator('.task-item input[type="checkbox"]');
        await checkboxes.nth(0).check();
        await checkboxes.nth(1).check();

        // Verify progress shows 2 of 3 completed
        await expect(page.locator('.task-list__count')).toHaveText('2 of 3 completed');

        // Click "Clear Completed" button
        const clearCompletedButton = page.locator('button:has-text("Clear Completed")');
        await clearCompletedButton.click();

        // Verify only the uncompleted task remains
        await expect(page.locator('.task-item')).toHaveCount(1);
        await expect(page.locator('.task-item__name')).toHaveText('Task 3');
    });

    test('should show progress correctly', async ({ page }) => {
        // Add multiple tasks
        const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4'];
        for (const task of tasks) {
            const input = page.locator('app-input input[placeholder="What needs to be done?"]');
            await input.fill(task);
            await input.press('Enter');
        }

        // Initially, 0 of 4 completed
        await expect(page.locator('.task-list__count')).toHaveText('0 of 4 completed');

        // Complete 2 tasks
        const checkboxes = page.locator('.task-item input[type="checkbox"]');
        await checkboxes.nth(0).check();
        await checkboxes.nth(1).check();

        // Should show 2 of 4 completed
        await expect(page.locator('.task-list__count')).toHaveText('2 of 4 completed');

        // Complete all tasks
        await checkboxes.nth(2).check();
        await checkboxes.nth(3).check();

        // Should show 4 of 4 completed
        await expect(page.locator('.task-list__count')).toHaveText('4 of 4 completed');
    });

    test('should handle empty task input', async ({ page }) => {
        const input = page.locator('app-input input[placeholder="What needs to be done?"]');
        const addButton = page.locator('button:has-text("Add Task")');

        // Try to add empty task
        await input.fill('');
        await addButton.click();

        // Verify no task was added
        await expect(page.locator('.task-list__empty')).toBeVisible();

        // Try to add task with only spaces
        await input.fill('   ');
        await addButton.click();

        // Verify no task was added
        await expect(page.locator('.task-list__empty')).toBeVisible();
    });

    test('should handle task with special characters', async ({ page }) => {
        const specialTask = 'Task with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';

        const input = page.locator('app-input input[placeholder="What needs to be done?"]');
        await input.fill(specialTask);
        await input.press('Enter');

        // Verify the task was added with special characters
        await expect(page.locator('.task-item__name')).toHaveText(specialTask);
    });

    test('should persist tasks across page reload', async ({ page }) => {
        // Add a task
        const input = page.locator('app-input input[placeholder="What needs to be done?"]');
        await input.fill('Persistent task');
        await input.press('Enter');

        // Verify task exists
        await expect(page.locator('.task-item__name')).toHaveText('Persistent task');

        // Reload the page
        await page.reload();
        await page.waitForLoadState('networkidle');

        // Verify task still exists
        await expect(page.locator('.task-item__name')).toHaveText('Persistent task');
    });

    test('should be responsive on mobile viewport', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Add a task
        const input = page.locator('app-input input[placeholder="What needs to be done?"]');
        await input.fill('Mobile test task');
        await input.press('Enter');

        // Verify task is visible and properly styled on mobile
        await expect(page.locator('.task-item')).toBeVisible();

        // Check that the layout is responsive (task item should be in column layout)
        const taskItem = page.locator('.task-item');
        await expect(taskItem).toHaveCSS('flex-direction', 'column');
    });
}); 