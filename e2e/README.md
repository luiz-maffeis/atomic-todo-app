# E2E Testing with Playwright

This directory contains end-to-end tests for the Atomic Todo App using Playwright.

## Test Structure

- `todo-app.spec.ts` - Comprehensive e2e tests covering all app functionality
- `todo-app-pom.spec.ts` - Refactored tests using Page Object Model pattern
- `pages/todo-page.ts` - Page Object Model for the todo app

## Running E2E Tests

### Prerequisites

1. Install Playwright browsers:
```bash
npm run e2e:install
```

### Available Commands

- `npm run e2e` - Run all e2e tests
- `npm run e2e:ui` - Run tests with Playwright UI mode (interactive)
- `npm run e2e:headed` - Run tests in headed mode (visible browser)
- `npm run e2e:debug` - Run tests in debug mode
- `npm run e2e:report` - Open the HTML test report

### Running Specific Tests

```bash
# Run tests in a specific file
npx playwright test todo-app.spec.ts

# Run tests with a specific name
npx playwright test -g "should add a new task"

# Run tests in a specific browser
npx playwright test --project=chromium
```

## Test Coverage

The e2e tests cover the following functionality:

### Core Features
- ✅ Adding new tasks
- ✅ Completing tasks
- ✅ Toggling task completion
- ✅ Editing task names
- ✅ Removing individual tasks
- ✅ Removing completed tasks
- ✅ Progress tracking

### Edge Cases
- ✅ Empty task input handling
- ✅ Special characters in task names
- ✅ Task persistence across page reload
- ✅ Button state management
- ✅ Keyboard navigation

### UI/UX
- ✅ Empty state display
- ✅ Responsive design (mobile viewport)
- ✅ Visual feedback for completed tasks
- ✅ Progress bar functionality

## Page Object Model

The `TodoPage` class provides a clean abstraction for interacting with the todo app:

```typescript
const todoPage = new TodoPage(page);

// Add a task
await todoPage.addTask('My task');

// Complete a task
await todoPage.completeTask('My task');

// Verify task exists
await todoPage.expectTaskToExist('My task');
```

## Browser Support

Tests run against multiple browsers:
- Chromium (Desktop Chrome)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

## CI/CD Integration

E2E tests are automatically run on:
- Pull requests to `main` and `develop` branches
- Pushes to `main` and `develop` branches

The GitHub Actions workflow:
1. Sets up Node.js environment
2. Installs dependencies and Playwright browsers
3. Builds the application
4. Runs e2e tests
5. Uploads test reports and traces as artifacts

## Debugging Failed Tests

1. **Run in headed mode**: `npm run e2e:headed`
2. **Run in debug mode**: `npm run e2e:debug`
3. **Use Playwright UI**: `npm run e2e:ui`
4. **View test traces**: Check the `test-results/` directory
5. **View HTML report**: `npm run e2e:report`

## Best Practices

1. **Use Page Object Model**: Encapsulate page interactions in reusable classes
2. **Write descriptive test names**: Use clear, descriptive test names
3. **Test user workflows**: Focus on testing complete user journeys
4. **Handle async operations**: Always wait for elements to be ready
5. **Use data attributes**: Prefer data attributes over CSS classes for selectors
6. **Keep tests independent**: Each test should be able to run in isolation

## Troubleshooting

### Common Issues

1. **Tests failing on CI but passing locally**
   - Check for timing issues
   - Ensure proper wait conditions
   - Verify browser compatibility

2. **Element not found errors**
   - Check if selectors are still valid after UI changes
   - Ensure elements are visible before interaction
   - Add appropriate wait conditions

3. **Flaky tests**
   - Add explicit waits for dynamic content
   - Use more reliable selectors
   - Consider using `waitForLoadState()` for page loads

### Getting Help

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices) 