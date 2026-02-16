import React from 'react';
import { SalaryBreakdown } from '../types';
import { formatCurrency } from '../salaryUtils';
import { BreakdownItem } from './BreakdownItem';

interface PayslipViewProps {
  breakdown: SalaryBreakdown;
}

export const PayslipView: React.FC<PayslipViewProps> = ({ breakdown }) => {
  const handleDownloadPayslip = () => {
    const date = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    const line = "----------------------------------------------------";
    const payslipText = `
INHAND MONTHLY PAYSLIP
Period: ${date}
${line}
EARNINGS (Monthly)
Basic Pay:              ${formatCurrency(breakdown.basicAnnual / 12)}
HRA:                    ${formatCurrency(breakdown.hraAnnual / 12)}
Special Allowance:      ${formatCurrency(breakdown.specialAnnual / 12)}
${breakdown.laptopAnnual > 0 ? `Laptop Benefit:         ${formatCurrency(breakdown.laptopAnnual / 12)}` : ''}
${breakdown.ltaAnnual > 0 ? `LTA Component:          ${formatCurrency(breakdown.ltaAnnual / 12)}` : ''}
Gross Monthly Salary:   ${formatCurrency(breakdown.grossMonthly)}
${line}
DEDUCTIONS (Monthly)
Income Tax (TDS):       ${formatCurrency(breakdown.monthlyIncomeTax)}
Provident Fund (EPF):   ${formatCurrency(breakdown.providentFund)}
Professional Tax:       ${formatCurrency(breakdown.professionalTax)}
Total Deductions:       ${formatCurrency(breakdown.totalDeductions / 12)}
${line}
NET TAKE-HOME:          ${formatCurrency(breakdown.inHandMonthly)}
${line}
Note: Calculated under AY 2026-27 Slabs (FY 2025-26).
Generated via InHand Calculator.
    `.trim();

    const blob = new Blob([payslipText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Payslip_${date.replace(' ', '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 relative group">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-slate-800 dark:text-white">Monthly Pay Slip View</h3>
        <button 
          onClick={handleDownloadPayslip}
          title="Download Pay Slip"
          className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
      <div className="space-y-3">
        <BreakdownItem label="Basic Pay" value={breakdown.basicAnnual / 12} />
        <BreakdownItem label="HRA" value={breakdown.hraAnnual / 12} />
        <BreakdownItem label="Special Allowance" value={breakdown.specialAnnual / 12} />
        {breakdown.laptopAnnual > 0 && <BreakdownItem label="Laptop Benefit" value={breakdown.laptopAnnual / 12} />}
        {breakdown.ltaAnnual > 0 && <BreakdownItem label="LTA Component" value={breakdown.ltaAnnual / 12} />}
        <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
        <BreakdownItem label="Income Tax" value={-breakdown.monthlyIncomeTax} isNegative />
        <BreakdownItem label="Provident Fund" value={-breakdown.providentFund} isNegative />
        <BreakdownItem label="Professional Tax" value={-breakdown.professionalTax} isNegative />
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between font-bold text-slate-900 dark:text-white">
          <span>Net Take-Home</span>
          <span className="text-indigo-600 dark:text-indigo-400">{formatCurrency(breakdown.inHandMonthly)}</span>
        </div>
      </div>
    </div>
  );
};
