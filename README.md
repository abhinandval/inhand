# InHand - In-Hand Salary Calculator

[![Tests](https://github.com/abhinandval/inhand/actions/workflows/tests.yml/badge.svg)](https://github.com/abhinandval/inhand/actions/workflows/tests.yml)
[![Unit Tests](https://img.shields.io/badge/unit%20tests-12%20passed-brightgreen)](https://github.com/abhinandval/inhand)
[![E2E Tests](https://img.shields.io/badge/e2e%20tests-5%20passed-brightgreen)](https://github.com/abhinandval/inhand)

A modern, responsive salary calculator that helps you calculate your monthly in-hand salary with detailed tax breakdowns under the Indian Income Tax AY 2026-27 (FY 2025-26) regime.

## Features

- **Salary Input** - Enter your salary components (Basic, HRA, Special Allowance, Laptop Incentive, LTA)
- **Tax Calculation** - Automatic calculation of income tax, PF, and professional tax
- **Monthly In-Hand** - See your exact monthly take-home salary
- **Payslip View** - Detailed monthly payslip breakdown with download option
- **Compare Salary** - Compare your current salary with the calculated in-hand
- **Dark/Light Mode** - Toggle between light and dark themes
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd inhand

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5174`

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.tsx                 # Main application component
├── main.tsx               # Entry point
├── salaryUtils.ts         # Salary calculation utilities
├── types.ts               # TypeScript type definitions
└── components/
    ├── Header.tsx         # App header with theme toggle
    ├── Footer.tsx         # App footer
    ├── InputForm.tsx      # Salary input form
    ├── InHandCompareCard.tsx  # In-hand salary display + compare
    ├── PayslipView.tsx   # Monthly payslip breakdown
    ├── SalaryInput.tsx    # Reusable salary input component
    ├── BreakdownItem.tsx  # Reusable breakdown item
    └── ThemeContext.tsx  # Dark/light theme context
```

## Tax Regime

Currently supports the **Enhanced New Regime** for AY 2026-27 (FY 2025-26) with standard deductions and tax slabs.

## License

MIT
