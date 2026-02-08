
import { GoogleGenAI } from "@google/genai";
import { SalaryBreakdown } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (breakdown: SalaryBreakdown): Promise<string> => {
  try {
    const prompt = `
      Act as a senior financial advisor in India. 
      Analyze this salary breakdown for a salaried employee under the New Tax Regime (FY 2024-25):
      - Gross Annual Salary: ₹${breakdown.grossAnnual}
      - Annual Income Tax: ₹${breakdown.annualIncomeTax.toFixed(0)}
      - Take Home (Monthly): ₹${breakdown.inHandMonthly.toFixed(0)}
      - Monthly PF Contribution: ₹${breakdown.providentFund.toFixed(0)}
      
      Provide 3-4 concise, professional bullet points on:
      1. Their tax efficiency.
      2. Suggestion for investment (e.g. PPF, ELSS, NPS) even though 80C is less relevant in New Regime, they still need wealth creation.
      3. A quick rule-of-thumb for budgeting (e.g. 50/30/20).
      
      Keep it encouraging and data-driven.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "Unable to generate advice at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The financial advisor is currently unavailable. Please check your inputs.";
  }
};
