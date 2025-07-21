# Atomic Todo App

A modern, responsive Todo application built with Angular and Atomic Design methodology. This project demonstrates how to structure a scalable frontend application using Atomic Design principles.

## 🚀 Features

- **Atomic Design Architecture**: Organized into atoms, molecules, organisms, templates, and pages
- **TypeScript**: Full type safety throughout the application
- **Local Storage**: Tasks persist across browser sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful gradients, animations, and smooth transitions
- **Task Management**: Add, edit, complete, and remove tasks
- **Progress Tracking**: Visual progress bar showing completion status
- **Accessibility**: ARIA labels, keyboard navigation, and focus management

## 🏗️ Atomic Design Structure

### Atoms
The smallest building blocks of the application:

- **Button** (`src/app/components/atoms/button/`)
  - Reusable button component with multiple variants (primary, secondary, danger, success)
  - Different sizes (small, medium, large)
  - Hover effects and animations

- **Input** (`src/app/components/atoms/input/`)
  - Form input component with focus states
  - Error and success states
  - Responsive sizing

- **Checkbox** (`src/app/components/atoms/checkbox/`)
  - Custom styled checkbox with smooth animations
  - Accessible keyboard navigation
  - Visual feedback on interaction

### Molecules
Simple combinations of atoms:

- **Task Item** (`src/app/components/molecules/task-item/`)
  - Combines checkbox, text, and action buttons
  - Inline editing functionality
  - Hover effects and animations

- **Task Form** (`src/app/components/molecules/task-form/`)
  - Combines input and button for adding new tasks
  - Form validation and submission handling

### Organisms
Complex UI components:

- **Task List** (`src/app/components/organisms/task-list/`)
  - Displays multiple task items
  - Progress tracking and statistics
  - Empty state handling
  - Bulk actions (clear completed)

### Templates
Page-level layouts:

- **Todo Template** (`src/app/components/templates/todo-template/`)
  - Defines the overall page structure
  - Header, main content area, and footer
  - Responsive container and spacing

### Pages
Complete user interfaces:

- **Todo Page** (`src/app/components/pages/todo-page/`)
  - Combines all organisms, molecules, and atoms
  - Handles business logic and state management
  - Connects to services and data

## 🛠️ Technical Implementation

### TypeScript Interfaces

```typescript
export interface Task {
  id: string;
  name: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Services

- **TaskService**: Manages task state, local storage persistence, and business logic
- **Observable Pattern**: Uses RxJS for reactive state management
- **Local Storage**: Automatic persistence of tasks across sessions

### Styling Approach

- **CSS Custom Properties**: Consistent theming and easy customization
- **BEM Methodology**: Block Element Modifier for maintainable CSS
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: Smooth transitions and micro-interactions
- **Gradients**: Modern visual design with gradient backgrounds

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd atomic-todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers (for e2e testing):
```bash
npm run e2e:install
```

4. Start the development server:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:4200`

### Testing

**Unit Tests:**
```bash
npm run test
```

**End-to-End Tests:**
```bash
npm run e2e
```

For more testing options, see the [E2E Testing Guide](./e2e/README.md).

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run e2e` - Run end-to-end tests
- `npm run e2e:ui` - Run e2e tests with Playwright UI
- `npm run e2e:headed` - Run e2e tests in headed mode
- `npm run e2e:debug` - Run e2e tests in debug mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🧪 Testing

The application includes unit tests for components and services. Tests are written using Jasmine and run with Karma.

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

Key responsive features:
- Flexible layouts that adapt to screen size
- Touch-friendly interactions on mobile
- Optimized spacing and typography
- Collapsible navigation and actions

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Success**: Green gradient (#51cf66 to #40c057)
- **Danger**: Red gradient (#ff6b6b to #ee5a52)
- **Neutral**: Grays (#f8f9fa, #e9ecef, #dee2e6, #adb5bd, #6c757d)

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Font Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Line Heights**: 1.4 (body), 1.6 (paragraphs)

### Spacing
- **Base Unit**: 4px
- **Spacing Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 60px

## 🔧 Configuration

### ESLint
The project uses ESLint for code quality and consistency. Configuration is in `.eslintrc.json`.

### Prettier
Code formatting is handled by Prettier with Angular-specific configurations.

### TypeScript
Strict TypeScript configuration ensures type safety throughout the application.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables
- No environment variables required for basic functionality
- Local storage handles data persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Atomic Design Methodology**: Brad Frost for the design system approach
- **Angular Team**: For the excellent framework and tooling
- **Design Inspiration**: Modern UI/UX patterns and best practices

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using Angular and Atomic Design principles.
