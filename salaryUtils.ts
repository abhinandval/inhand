
import { SalaryBreakdown, TaxRegime, Slab } from './types';

export const calculateTax = (taxableIncome: number): number => {
  // New Regime 24-25 Rules (Post-Budget 2024 Update):
  // Up to 3L: Nil
  // 3L - 7L: 5% 
  // 7L - 10L: 10%
  // 10L - 12L: 15%
  // 12L - 15L: 20%
  // Above 15L: 30%
  
  if (taxableIncome <= 700000) return 0;

  let tax = 0;
  let remaining = taxableIncome;

  // Slab 1: 0 - 3L
  remaining -= 300000;
  if (remaining <= 0) return 0;

  // Slab 2: 3L - 7L
  const slab2 = Math.min(remaining, 400000);
  tax += slab2 * 0.05;
  remaining -= slab2;
  if (remaining <= 0) return tax + (tax * 0.04); 

  // Slab 3: 7L - 10L
  const slab3 = Math.min(remaining, 300000);
  tax += slab3 * 0.10;
  remaining -= slab3;
  if (remaining <= 0) return tax + (tax * 0.04);

  // Slab 4: 10L - 12L
  const slab4 = Math.min(remaining, 200000);
  tax += slab4 * 0.15;
  remaining -= slab4;
  if (remaining <= 0) return tax + (tax * 0.04);

  // Slab 5: 12L - 15L
  const slab5 = Math.min(remaining, 300000);
  tax += slab5 * 0.20;
  remaining -= slab5;
  if (remaining <= 0) return tax + (tax * 0.04);

  // Slab 6: Above 15L
  tax += remaining * 0.30;
  
  return tax + (tax * 0.04);
};

export const getBreakdown = (
  basic: number, 
  hra: number, 
  special: number, 
  laptop: number, 
  lta: number
): SalaryBreakdown => {
  const grossAnnual = basic + hra + special + laptop + lta;
  const standardDeduction = 75000; 
  const professionalTax = 200 * 12; 
  
  // PF calculation: 12% of Basic Salary (Statutory limit often ₹1800/mo or 12% of basic)
  const providentFund = Math.min(basic * 0.12, 1800 * 12); 
  
  const taxableIncome = Math.max(0, grossAnnual - standardDeduction);
  const annualIncomeTax = calculateTax(taxableIncome);
  
  const totalDeductions = annualIncomeTax + professionalTax + providentFund;
  const inHandAnnual = grossAnnual - totalDeductions;
  
  return {
    basicAnnual: basic,
    hraAnnual: hra,
    specialAnnual: special,
    laptopAnnual: laptop,
    ltaAnnual: lta,
    grossAnnual,
    grossMonthly: grossAnnual / 12,
    standardDeduction,
    taxableIncome,
    annualIncomeTax,
    monthlyIncomeTax: annualIncomeTax / 12,
    professionalTax: 200,
    providentFund: providentFund / 12,
    inHandMonthly: inHandAnnual / 12,
    inHandAnnual,
    totalDeductions
  };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
