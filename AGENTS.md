# AGENTS.md - Development Guidelines

## Project Overview

InHand is a salary calculator web application built with React 19, TypeScript, Vite, and Tailwind CSS v4. It calculates in-hand monthly salary with detailed tax breakdowns for the Indian Assessment Year 2026-27.

## Build Commands

```bash
npm run dev         # Start development server (port 3000)
npm run build       # Production build to dist/
npm run preview     # Preview production build locally
npm run prepare     # Install Husky git hooks
```

### Running a Single Test

No test framework is currently configured. To add tests, consider:
```bash
npm install vitest @testing-library/react @testing-library/jest-dom
```

Then add to package.json:
```json
"test": "vitest",
"test:run": "vitest run"
```

## Code Style Guidelines

### General Principles

- **No comments** - Write self-documenting code
- **Keep files under 200 lines** when possible
- **Use functional programming** patterns over classes

### TypeScript

- Enable `strict: true` in tsconfig (implied by project settings)
- Use explicit return types for exported functions
- Prefer interfaces over types for object shapes
- Use `any` sparingly - prefer `unknown` when type is uncertain

```typescript
// Good
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Avoid unnecessary type annotations
const inputs = useState({ basic: '800000', hra: '0' }); // Type inferred
```

### React & Components

- Use functional components with explicit `React.FC` type for exported components
- Use hooks: `useState`, `useEffect`, `useCallback`, `useMemo`
- Memoize expensive computations with `useCallback` or `useMemo`
- Extract reusable logic into custom hooks

```typescript
// Component structure pattern
const AppContent: React.FC = () => {
  const [state, setState] = useState<Type>(initial);
  
  const handler = useCallback((param: Type) => {
    // logic
  }, [dependencies]);
  
  return <JSX />;
};

const App: React.FC = () => (
  <Provider>
    <AppContent />
  </Provider>
);

export default App;
```

### Imports

- Use path alias `@/` for relative imports from project root
- Group imports: external → internal → types
- Use named exports for utilities

```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { getBreakdown } from './salaryUtils';
import { SalaryBreakdown } from './types';
import { ThemeProvider } from './components/ThemeContext';
import { Header } from './components/Header';
```

### Naming Conventions

- **Files**: PascalCase for components (Header.tsx), camelCase for utilities (salaryUtils.ts)
- **Components**: PascalCase (Header, InputForm)
- **Functions/variables**: camelCase (calculateSalary, handleInputChange)
- **Constants**: camelCase or UPPER_SNAKE_CASE for config values
- **Interfaces/Types**: PascalCase (SalaryBreakdown, TaxRegime)
- **Enums**: PascalCase with PascalCase values

### CSS & Styling

- Use Tailwind CSS utility classes
- Support dark mode via `class` strategy
- Use semantic HTML elements
- Keep responsive design in mind (mobile-first)

```typescript
<div className="min-h-screen pb-20 px-4 md:px-8 bg-slate-50 dark:bg-slate-900 transition-colors">
```

### Error Handling

- Use early returns for validation
- Handle edge cases explicitly (e.g., NaN, undefined)
- Add defensive checks for numeric operations

```typescript
const calculateSalary = useCallback(() => {
  const b = parseFloat(inputs.basic) || 0;
  if (b <= 0) return;
  // ...
}, [inputs]);
```

### Git & Commits

- Follow Conventional Commits format
- Use Husky pre-commit hooks (already configured)
- Commit types: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`

```bash
git commit -m "feat: add salary breakdown calculation"
git commit -m "fix: correct tax slab calculation"
```

## Project Structure

```
src/
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
├── salaryUtils.ts         # Tax calculation utilities
├── types.ts               # TypeScript interfaces/types
└── components/
    ├── Header.tsx         # App header
    ├── Footer.tsx         # App footer
    ├── InputForm.tsx      # Salary input form
    ├── SalaryInput.tsx    # Individual input field
    ├── PayslipView.tsx    # Salary breakdown display
    ├── BreakdownItem.tsx  # Breakdown row item
    ├── InHandCompareCard.tsx # In-hand vs gross comparison
    └── ThemeContext.tsx   # Dark mode theme provider

public/
├── coi-serviceworker.min.js  # COOP/COEP headers
└── [PWA assets]
```

## Key Dependencies

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **vite-plugin-pwa** - PWA support
- **vite-plugin-csp** - Content Security Policy
- **coi-serviceworker** - Cross-origin isolation headers
- **@vitejs/plugin-react** - React fast refresh
- **babel-plugin-react-compiler** - React 19 compiler

## Configuration Files

- `vite.config.ts` - Vite, PWA, CSP configuration
- `tsconfig.json` - TypeScript configuration (ES2022, bundler module resolution)
- `tailwind.config.js` - Tailwind v4 (inline in Vite config)

## Security Headers (Already Implemented)

- **CSP**: via vite-plugin-csp (script-src, style-src, img-src, etc.)
- **COOP/COEP**: via coi-serviceworker (same-origin, credentialless)
- These are built into the production output

## Development Workflow

1. Run `npm run dev` for local development
2. Make changes following the code style guidelines
3. Test with `npm run build` before committing
4. Push to trigger GitHub Actions deployment to GitHub Pages
