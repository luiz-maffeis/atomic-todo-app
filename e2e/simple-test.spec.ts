import { test, expect } from '@playwright/test';

test('should load the todo app', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that the main component is visible
    await expect(page.locator('app-todo-page')).toBeVisible();

    // Check that the empty state is shown
    await expect(page.locator('.task-list__empty')).toBeVisible();

    // Check that the input field is available
    await expect(page.locator('app-input input')).toBeVisible();

    // Check that the add button is available
    await expect(page.locator('app-button:has-text("Add Task")')).toBeVisible();
}); 