import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly taskInput: Locator;
    readonly addButton: Locator;
    readonly taskItems: Locator;
    readonly emptyState: Locator;
    readonly progressCount: Locator;
    readonly clearCompletedButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.taskInput = page.locator('app-input input[placeholder="What needs to be done?"]');
        this.addButton = page.locator('button:has-text("Add Task")');
        this.taskItems = page.locator('.task-item');
        this.emptyState = page.locator('.task-list__empty');
        this.progressCount = page.locator('.task-list__count');
        this.clearCompletedButton = page.locator('button:has-text("Clear Completed")');
    }

    async goto() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
    }

    async addTask(taskName: string) {
        await this.taskInput.fill(taskName);
        await this.taskInput.press('Enter');
    }

    async addTaskWithButton(taskName: string) {
        await this.taskInput.fill(taskName);
        await this.addButton.click();
    }

    async getTaskByName(taskName: string) {
        return this.page.locator('.task-item__name', { hasText: taskName }).first();
    }

    async getTaskCheckbox(taskName: string) {
        const taskItem = this.page.locator('.task-item').filter({ hasText: taskName });
        return taskItem.locator('input[type="checkbox"]');
    }

    async getTaskEditButton(taskName: string) {
        const taskItem = this.page.locator('.task-item').filter({ hasText: taskName });
        return taskItem.locator('button:has-text("Edit")');
    }

    async getTaskRemoveButton(taskName: string) {
        const taskItem = this.page.locator('.task-item').filter({ hasText: taskName });
        return taskItem.locator('button:has-text("Remove")');
    }

    async completeTask(taskName: string) {
        const checkbox = await this.getTaskCheckbox(taskName);
        await checkbox.check();
    }

    async uncompleteTask(taskName: string) {
        const checkbox = await this.getTaskCheckbox(taskName);
        await checkbox.uncheck();
    }

    async editTask(oldName: string, newName: string) {
        const editButton = await this.getTaskEditButton(oldName);
        await editButton.click();

        const editInput = this.page.locator('.task-item__edit input');
        await editInput.clear();
        await editInput.fill(newName);
        await editInput.press('Enter');
    }

    async removeTask(taskName: string) {
        const removeButton = await this.getTaskRemoveButton(taskName);
        await removeButton.click();
    }

    async clearCompletedTasks() {
        await this.clearCompletedButton.click();
    }

    async getTaskCount() {
        return await this.taskItems.count();
    }

    async getCompletedTaskCount() {
        return await this.page.locator('.task-item--completed').count();
    }

    async expectTaskToExist(taskName: string) {
        const taskElement = await this.getTaskByName(taskName);
        await expect(taskElement).toBeVisible();
    }

    async expectTaskToNotExist(taskName: string) {
        const taskElement = await this.getTaskByName(taskName);
        await expect(taskElement).not.toBeVisible();
    }

    async expectTaskToBeCompleted(taskName: string) {
        const taskItem = this.page.locator('.task-item').filter({ hasText: taskName });
        await expect(taskItem).toHaveClass(/task-item--completed/);
    }

    async expectTaskToNotBeCompleted(taskName: string) {
        const taskItem = this.page.locator('.task-item').filter({ hasText: taskName });
        await expect(taskItem).not.toHaveClass(/task-item--completed/);
    }

    async expectEmptyState() {
        await expect(this.emptyState).toBeVisible();
        await expect(this.page.locator('.task-list__empty-title')).toHaveText('No tasks yet');
    }

    async expectProgressCount(expectedText: string) {
        await expect(this.progressCount).toHaveText(expectedText);
    }

    async expectInputToBeEmpty() {
        await expect(this.taskInput).toHaveValue('');
    }

    async expectAddButtonToBeDisabled() {
        await expect(this.addButton).toBeDisabled();
    }

    async expectAddButtonToBeEnabled() {
        await expect(this.addButton).toBeEnabled();
    }
} 