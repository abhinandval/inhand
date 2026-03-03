import { describe, it, expect } from 'vitest';
import { calculateTax, getBreakdown, formatCurrency } from './salaryUtils';

describe('calculateTax', () => {
  it('returns 0 for income up to 12L (87A rebate)', () => {
    expect(calculateTax(0)).toBe(0);
    expect(calculateTax(400000)).toBe(0);
    expect(calculateTax(800000)).toBe(0);
    expect(calculateTax(1200000)).toBe(0);
  });

  it('returns non-zero tax for income above 12L', () => {
    expect(calculateTax(1300000)).toBeGreaterThan(0);
    expect(calculateTax(1600000)).toBeGreaterThan(0);
    expect(calculateTax(2000000)).toBeGreaterThan(0);
  });

  it('calculates higher tax for higher income', () => {
    const tax16L = calculateTax(1600000);
    const tax20L = calculateTax(2000000);
    expect(tax20L).toBeGreaterThan(tax16L);
  });

  it('includes 4% health and education cess', () => {
    const tax = calculateTax(1600000);
    const taxBeforeCess = tax / 1.04;
    const cess = tax - taxBeforeCess;
    expect(cess).toBeCloseTo(taxBeforeCess * 0.04, 0);
  });
});

describe('getBreakdown', () => {
  it('calculates complete salary breakdown', () => {
    const result = getBreakdown(1200000, 240000, 120000, 0, 60000);
    
    expect(result.basicAnnual).toBe(1200000);
    expect(result.hraAnnual).toBe(240000);
    expect(result.specialAnnual).toBe(120000);
    expect(result.laptopAnnual).toBe(0);
    expect(result.ltaAnnual).toBe(60000);
    expect(result.grossAnnual).toBe(1620000);
    expect(result.grossMonthly).toBe(135000);
  });

  it('applies standard deduction of 75000', () => {
    const result = getBreakdown(1200000, 240000, 120000, 0, 60000);
    expect(result.standardDeduction).toBe(75000);
    expect(result.taxableIncome).toBe(1620000 - 75000);
  });

  it('calculates professional tax correctly', () => {
    const result = getBreakdown(1200000, 240000, 120000, 0, 60000);
    expect(result.professionalTax).toBe(200);
  });

  it('calculates provident fund with caps', () => {
    const result = getBreakdown(1200000, 240000, 120000, 0, 60000);
    const expectedPF = Math.min(1200000 * 0.12, 1800 * 12);
    expect(result.providentFund).toBeCloseTo(expectedPF / 12, 2);
  });

  it('calculates in-hand monthly salary', () => {
    const result = getBreakdown(1200000, 240000, 120000, 0, 60000);
    expect(result.inHandMonthly).toBeGreaterThan(0);
    expect(result.inHandMonthly).toBeLessThan(result.grossMonthly);
  });
});

describe('formatCurrency', () => {
  it('formats INR currency correctly', () => {
    expect(formatCurrency(500000)).toContain('5');
    expect(formatCurrency(500000)).toContain('00,000');
  });

  it('formats large numbers with commas', () => {
    expect(formatCurrency(1000000)).toContain('10,00,000');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toContain('0');
  });
});
