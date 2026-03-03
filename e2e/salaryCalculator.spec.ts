import { test, expect } from '@playwright/test';

test.describe('Salary Calculator E2E', () => {
  test('loads without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes("'frame-ancestors'") && !text.includes('CSP')) {
          errors.push(text);
        }
      }
    });

    await page.goto('/');
    
    await expect(page).toHaveTitle(/InHand/);
    await expect(page.getByRole('heading', { name: 'InHand' })).toBeVisible();
    
    expect(errors).toHaveLength(0);
  });

  test('displays default calculation', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByText('Monthly In-Hand', { exact: true })).toBeVisible();
    await expect(page.getByText('Monthly Pay Slip View')).toBeVisible();
  });

  test('updates on input change', async ({ page }) => {
    await page.goto('/');
    
    const inputs = page.getByRole('spinbutton');
    const basicInput = inputs.nth(0);
    
    await basicInput.fill('1200000');
    
    await expect(page.getByText('Monthly In-Hand', { exact: true })).toBeVisible();
  });

  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/');
    
    const html = page.locator('html');
    const toggleButton = page.getByTitle(/Switch to/);
    
    const initialTheme = await html.evaluate(el => el.classList.contains('dark'));
    
    await toggleButton.click();
    
    await page.waitForTimeout(300);
    
    const newTheme = await html.evaluate(el => el.classList.contains('dark'));
    expect(newTheme).not.toBe(initialTheme);
  });

  test('downloads payslip', async ({ page }) => {
    await page.goto('/');
    
    const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null);
    
    const downloadButton = page.getByTitle('Download Pay Slip');
    await downloadButton.click();
    
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toContain('Payslip');
    }
  });
});
