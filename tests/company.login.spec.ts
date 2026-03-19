import { test, expect } from '@playwright/test';

test('Company login functionality', async ({ page }) => {
  // 1. Open login page
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/login.php?action=login', { waitUntil: 'domcontentloaded' });
  
  // Wait for page content
  await page.waitForTimeout(2000);

  // 2. Fill username (company account)
  await page.locator('input[name="username"]').fill('yuwanika-manager');

  // 3. Fill password
  await page.locator('input[name="password"]').fill('Yis12345');

  // 4. Click Sign in
  await page.locator('button[type="submit"]').click();

  // 5. Wait for redirect and verify
  await page.waitForTimeout(3000);
  const currentUrl = page.url();
  console.log('Current URL after company login:', currentUrl);
  expect(currentUrl).toContain('action=dashboard');
});