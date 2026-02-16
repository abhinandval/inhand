
import React, { useState, useEffect, useCallback } from 'react';
import { getBreakdown } from './salaryUtils';
import { SalaryBreakdown } from './types';
import { ThemeProvider } from './components/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InputForm } from './components/InputForm';
import { InHandCompareCard } from './components/InHandCompareCard';
import { PayslipView } from './components/PayslipView';

const AppContent: React.FC = () => {
  const [inputs, setInputs] = useState({
    basic: '800000',
    hra: '0',
    special: '0',
    laptop: '0',
    lta: '0'
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

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 bg-slate-50 dark:bg-slate-900 transition-colors">
      <Header />

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputForm 
          inputs={inputs} 
          onInputChange={handleInputChange}
          grossAnnual={breakdown?.grossAnnual || 0}
        />

        <div className="flex flex-col gap-4">
          {breakdown && (
            <InHandCompareCard 
              inHandMonthly={breakdown.inHandMonthly}
              inHandAnnual={breakdown.inHandAnnual}
            />
          )}

          {breakdown && (
            <PayslipView breakdown={breakdown} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
