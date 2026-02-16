import React from 'react';
import { SalaryInput } from './SalaryInput';

type InputValues = {
  basic: string;
  hra: string;
  special: string;
  laptop: string;
  lta: string;
};

interface InputFormProps {
  inputs: InputValues;
  onInputChange: (field: keyof InputValues, value: string) => void;
  grossAnnual: number;
}

export const InputForm: React.FC<InputFormProps> = ({ inputs, onInputChange, grossAnnual }) => (
  <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-700 pb-2">Base Components</h3>
      <SalaryInput 
        label="Basic Salary (Annual)" 
        value={inputs.basic} 
        onChange={(val) => onInputChange('basic', val)} 
      />
      <SalaryInput 
        label="HRA (Annual)" 
        value={inputs.hra} 
        onChange={(val) => onInputChange('hra', val)} 
      />
      <SalaryInput 
        label="Special Allowance (Annual)" 
        value={inputs.special} 
        onChange={(val) => onInputChange('special', val)} 
      />
    </div>

    <div className="space-y-4 pt-2">
      <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-700 pb-2">Other Benefits</h3>
      <SalaryInput 
        label="Laptop Incentive (Annual)" 
        value={inputs.laptop} 
        onChange={(val) => onInputChange('laptop', val)} 
      />
      <SalaryInput 
        label="Leave Travel Allowance (Annual)" 
        value={inputs.lta} 
        onChange={(val) => onInputChange('lta', val)} 
      />
    </div>

    <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
      <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-sm">
        <span>Total Gross CTC</span>
        <span className="font-bold text-slate-900 dark:text-white">₹{grossAnnual.toLocaleString('en-IN')}</span>
      </div>
    </div>
  </section>
);
