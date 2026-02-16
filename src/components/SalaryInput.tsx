import React from 'react';

interface SalaryInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export const SalaryInput: React.FC<SalaryInputProps> = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium">₹</span>
      <input 
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-7 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-semibold text-slate-800 dark:text-white transition-all hover:bg-white dark:hover:bg-slate-600 placeholder:text-slate-400"
        placeholder="0"
      />
    </div>
  </div>
);
