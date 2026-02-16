
import { SalaryBreakdown, TaxRegime, Slab } from './types';

export const calculateTax = (taxableIncome: number): number => {
  // Assessment Year 2026-27 (FY 2025-26) Slabs as per user input:
  // Up to 4L: Nil
  // 4L - 8L: 5% 
  // 8L - 12L: 10%
  // 12L - 16L: 15%
  // 16L - 20L: 20%
  // 20L - 24L: 25%
  // Above 24L: 30%
  
  // Rebate u/s 87A: In the proposed structure associated with these slabs, 
  // full tax rebate is often provided for income up to 12L. 
  // However, for strict slab-wise calculation:
  if (taxableIncome <= 1200000) return 0; // Assuming the standard 87A rebate for the enhanced regime

  let tax = 0;
  let remaining = taxableIncome;

  // Slab 1: 0 - 4L (Nil)
  remaining -= 400000;
  if (remaining <= 0) return 0;

  // Slab 2: 4L - 8L (4L range @ 5%)
  const slab2 = Math.min(remaining, 400000);
  tax += slab2 * 0.05;
  remaining -= slab2;
  if (remaining <= 0) return tax + (tax * 0.04); 

  // Slab 3: 8L - 12L (4L range @ 10%)
  const slab3 = Math.min(remaining, 400000);
  tax += slab3 * 0.10;
  remaining -= slab3;
  if (remaining <= 0) return tax + (tax * 0.04);

  // Slab 4: 12L - 16L (4L range @ 15%)
  const slab4 = Math.min(remaining, 400000);
  tax += slab4 * 0.15;
  remaining -= slab4;
  if (remaining <= 0) return tax + (tax * 0.04);

  // Slab 5: 16L - 20L (4L range @ 20%)
  const slab5 = Math.min(remaining, 400000);
  tax += slab5 * 0.20;
  remaining -= slab5;
  if (remaining <= 0) return tax + (tax * 0.04);

  // Slab 6: 20L - 24L (4L range @ 25%)
  const slab6 = Math.min(remaining, 400000);
  tax += slab6 * 0.25;
  remaining -= slab6;
  if (remaining <= 0) return tax + (tax * 0.04);

  // Slab 7: Above 24L (@ 30%)
  tax += remaining * 0.30;
  
  return tax + (tax * 0.04); // Health & Education Cess @ 4%
};

export const getBreakdown = (
  basic: number, 
  hra: number, 
  special: number, 
  laptop: number, 
  lta: number
): SalaryBreakdown => {
  const grossAnnual = basic + hra + special + laptop + lta;
  const standardDeduction = 75000; // Standard deduction for New Regime
  const professionalTax = 200 * 12; 
  
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
