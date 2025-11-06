# NCLT Application

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Table of Contents

- [Development Server](#development-server)
- [Architecture Overview](#architecture-overview)
- [Sidebar Navigation System](#sidebar-navigation-system)
- [Building](#building)
- [Testing](#testing)
- [Additional Resources](#additional-resources)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Architecture Overview

The NCLT application follows a modular architecture with a focus on maintainability and scalability. Key architectural components include:

- **Standalone Components**: All components use Angular's standalone API for better tree-shaking and modularity
- **Service-Based State Management**: Centralized state management using RxJS observables
- **PrimeNG UI Components**: Consistent UI components from the PrimeNG library
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Sidebar Navigation System

The application features a sophisticated dual-sidebar navigation system that adapts to different screen sizes and user preferences.

#### Components

1. **Main Sidebar** (`AppSidebarComponent`)
   - Primary navigation with top-level menu items
   - Supports normal (icon + label) and compact (icon only) display modes
   - Adapts positioning based on viewport size (relative on desktop, overlay on mobile)
   - Located at: `projects/nclt-main/src/app/layout/components/app-sidebar/`

2. **Sub-Sidebar** (`AppSubSidebarComponent`)
   - Secondary navigation for nested menu items
   - Appears to the right of the main sidebar
   - Supports up to 5 levels of menu nesting
   - Includes expand/collapse functionality for nested items
   - Located at: `projects/nclt-main/src/app/layout/components/app-sub-sidebar/`

3. **Sidebar Menu Item** (`SidebarMenuItemComponent`)
   - Shared component used by both sidebars
   - Recursive rendering for nested menu structures
   - Supports tooltips, badges, and icons
   - Located at: `projects/nclt-main/src/app/layout/components/sidebar-menu-item/`

#### Navigation Service

The `NavigationService` provides centralized state management for the sidebar system:

- **State Management**: Manages display modes, positioning modes, visibility, and selection states
- **Route Tracking**: Automatically highlights menu items based on current route
- **Viewport Detection**: Responds to screen size changes using Angular CDK BreakpointObserver
- **Menu Configuration**: Centralized menu structure definition
- **Located at**: `projects/nclt-main/src/app/layout/services/navigation.service.ts`

#### Display Modes

- **Normal Mode**: Menu items show both icon and label
- **Compact Mode**: Menu items show only icons (with tooltips on hover)
- **Automatic Switching**: Main sidebar switches to compact mode when sub-sidebar opens

#### Positioning Modes

- **Relative Mode** (Desktop, >768px): Sidebars occupy layout space
- **Overlay Mode** (Mobile, ≤768px): Sidebars float above content
- **Automatic Detection**: Positioning mode switches automatically based on viewport size

#### Key Features

- **Responsive Behavior**: Seamless adaptation between mobile and desktop layouts
- **Keyboard Navigation**: Full keyboard support with focus management
- **Accessibility**: ARIA labels, roles, and focus indicators for screen readers
- **Theme Integration**: Deep integration with PrimeNG theme system
- **Smooth Animations**: Polished transitions with reduced-motion support
- **State Preservation**: Maintains state during viewport transitions

For detailed documentation on customizing the sidebar system, see [SIDEBAR_DOCUMENTATION.md](./docs/SIDEBAR_DOCUMENTATION.md).

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Testing

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
