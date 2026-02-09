
import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { getBreakdown, formatCurrency } from './salaryUtils';
import { SalaryBreakdown } from "./types";

const COLORS = ['#6366f1', '#f43f5e', '#fbbf24', '#22c55e', '#8b5cf6', '#06b6d4'];

const App: React.FC = () => {
  const [inputs, setInputs] = useState({
    basic: '600000',
    hra: '300000',
    special: '200000',
    laptop: '50000',
    lta: '50000'
  });
  
  const [breakdown, setBreakdown] = useState<SalaryBreakdown | null>(null);

  const calculateSalary = useCallback(() => {
    const b = parseFloat(inputs.basic) || 0;
    const h = parseFloat(inputs.hra) || 0;
    const s = parseFloat(inputs.special) || 0;
    const lap = parseFloat(inputs.laptop) || 0;
    const ltaVal = parseFloat(inputs.lta) || 0;
    
    if (b + h + s + lap + ltaVal <= 0) return;
    const result = getBreakdown(b, h, s, lap, ltaVal);
    setBreakdown(result);
  }, [inputs]);

  useEffect(() => {
    calculateSalary();
  }, [calculateSalary]);

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const chartData = breakdown ? [
    { name: 'In-Hand', value: breakdown.inHandMonthly },
    { name: 'Income Tax', value: breakdown.monthlyIncomeTax },
    { name: 'Provident Fund', value: breakdown.providentFund },
    { name: 'Prof. Tax', value: breakdown.professionalTax },
  ] : [];

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 bg-slate-50">
      <header className="max-w-6xl mx-auto pt-10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            SalaryWise
          </h1>
          <p className="text-slate-500 font-medium">
            Precision In-Hand Calculator (FY 2024-25)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
            New Tax Regime
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest border-b border-slate-50 pb-2">
                Base Components
              </h3>
              <SalaryInput
                label="Basic Salary (Annual)"
                value={inputs.basic}
                onChange={(val) => handleInputChange("basic", val)}
              />
              <SalaryInput
                label="HRA (Annual)"
                value={inputs.hra}
                onChange={(val) => handleInputChange("hra", val)}
              />
              <SalaryInput
                label="Special Allowance (Annual)"
                value={inputs.special}
                onChange={(val) => handleInputChange("special", val)}
              />
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest border-b border-slate-50 pb-2">
                Other Benefits
              </h3>
              <SalaryInput
                label="Laptop Incentive (Annual)"
                value={inputs.laptop}
                onChange={(val) => handleInputChange("laptop", val)}
              />
              <SalaryInput
                label="Leave Travel Allowance (Annual)"
                value={inputs.lta}
                onChange={(val) => handleInputChange("lta", val)}
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-slate-500 text-sm">
                <span>Total Gross CTC</span>
                <span className="font-bold text-slate-900">
                  {breakdown ? formatCurrency(breakdown.grossAnnual) : "₹0"}
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-8 space-y-8">
          {breakdown && (
            <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
              <p className="text-indigo-100 text-sm font-medium opacity-90">
                Monthly In-Hand
              </p>
              <h2 className="text-4xl font-bold mt-1">
                {formatCurrency(breakdown.inHandMonthly)}
              </h2>
              <div className="mt-4 pt-4 border-t border-indigo-400 flex justify-between items-center text-sm">
                <span>Annual Take Home</span>
                <span className="font-semibold">
                  {formatCurrency(breakdown.inHandAnnual)}
                </span>
              </div>
            </div>
          )}

          {breakdown && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800">
                Monthly Pay Slip View
              </h3>
              <div className="space-y-3">
                <BreakdownItem
                  label="Basic Pay"
                  value={breakdown.basicAnnual / 12}
                />
                <BreakdownItem label="HRA" value={breakdown.hraAnnual / 12} />
                <BreakdownItem
                  label="Special Allowance"
                  value={breakdown.specialAnnual / 12}
                />
                {breakdown.laptopAnnual > 0 && (
                  <BreakdownItem
                    label="Laptop Benefit"
                    value={breakdown.laptopAnnual / 12}
                  />
                )}
                {breakdown.ltaAnnual > 0 && (
                  <BreakdownItem
                    label="LTA Component"
                    value={breakdown.ltaAnnual / 12}
                  />
                )}
                <div className="h-px bg-slate-100 my-1"></div>
                <BreakdownItem
                  label="Income Tax"
                  value={-breakdown.monthlyIncomeTax}
                  isNegative
                />
                <BreakdownItem
                  label="Provident Fund"
                  value={-breakdown.providentFund}
                  isNegative
                />
                <BreakdownItem
                  label="Professional Tax"
                  value={-breakdown.professionalTax}
                  isNegative
                />
                <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900">
                  <span>Net Take-Home</span>
                  <span className="text-indigo-600">
                    {formatCurrency(breakdown.inHandMonthly)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-16 text-center text-slate-400 text-sm py-8">
        <p>
          © 2024 SalaryWise. Includes variable company components. New Regime FY
          2024-25.
        </p>
      </footer>
    </div>
  );
};

interface SalaryInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const SalaryInput: React.FC<SalaryInputProps> = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
      <input 
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-7 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-semibold text-slate-800 transition-all hover:bg-white"
        placeholder="0"
      />
    </div>
  </div>
);

interface BreakdownItemProps {
  label: string;
  value: number;
  isNegative?: boolean;
}

const BreakdownItem: React.FC<BreakdownItemProps> = ({ label, value, isNegative }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className={`font-semibold ${isNegative ? 'text-rose-500' : 'text-slate-700'}`}>
      {isNegative && value !== 0 ? '-' : ''}{formatCurrency(Math.abs(value))}
    </span>
  </div>
);

export default App;
