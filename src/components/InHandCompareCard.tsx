import React, { useState } from 'react';
import { formatCurrency } from '../salaryUtils';

interface InHandCompareCardProps {
  inHandMonthly: number;
  inHandAnnual: number;
}

export const InHandCompareCard: React.FC<InHandCompareCardProps> = ({ inHandMonthly, inHandAnnual }) => {
  const [currentInHand, setCurrentInHand] = useState<string>('');

  const current = parseFloat(currentInHand) || 0;
  const diff = inHandMonthly - current;
  const percentage = current > 0 ? ((diff / current) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="bg-indigo-600 dark:bg-indigo-700 p-6 text-white">
        <p className="text-indigo-100 dark:text-indigo-200 text-sm font-medium opacity-90">Monthly In-Hand</p>
        <h2 className="text-4xl font-bold mt-1">{formatCurrency(inHandMonthly)}</h2>
        <div className="mt-4 pt-4 border-t border-indigo-400 dark:border-indigo-500 flex justify-between items-center text-sm">
          <span>Annual Take Home</span>
          <span className="font-semibold">{formatCurrency(inHandAnnual)}</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-bold text-slate-800 dark:text-white">Compare with Current Salary</h3>
        
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Current Monthly In-Hand
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium">₹</span>
            <input 
              type="number"
              value={currentInHand}
              onChange={(e) => setCurrentInHand(e.target.value)}
              className="w-full pl-7 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-semibold text-slate-800 dark:text-white transition-all hover:bg-white dark:hover:bg-slate-600 placeholder:text-slate-400"
              placeholder="0"
            />
          </div>
        </div>

        {currentInHand && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Difference</span>
              <span className={`font-bold ${diff >= 0 ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {diff >= 0 ? '+' : ''}₹{Math.abs(diff).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Change</span>
              <span className={`font-bold ${percentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {percentage >= 0 ? '+' : ''}{percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
