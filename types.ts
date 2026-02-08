
export enum TaxRegime {
  NEW = 'NEW',
  OLD = 'OLD'
}

export interface SalaryBreakdown {
  basicAnnual: number;
  hraAnnual: number;
  specialAnnual: number;
  laptopAnnual: number;
  ltaAnnual: number;
  grossAnnual: number;
  grossMonthly: number;
  standardDeduction: number;
  taxableIncome: number;
  annualIncomeTax: number;
  monthlyIncomeTax: number;
  professionalTax: number;
  providentFund: number;
  inHandMonthly: number;
  inHandAnnual: number;
  totalDeductions: number;
}

export interface Slab {
  limit: number;
  rate: number;
}
