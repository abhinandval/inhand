import React from 'react';
import { formatCurrency } from '../salaryUtils';

interface BreakdownItemProps {
  label: string;
  value: number;
  isNegative?: boolean;
}

export const BreakdownItem: React.FC<BreakdownItemProps> = ({ label, value, isNegative }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-500 dark:text-slate-400 font-medium">{label}</span>
    <span className={`font-semibold ${isNegative ? 'text-rose-500 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
      {isNegative && value !== 0 ? '-' : ''}{formatCurrency(Math.abs(value))}
    </span>
  </div>
);
