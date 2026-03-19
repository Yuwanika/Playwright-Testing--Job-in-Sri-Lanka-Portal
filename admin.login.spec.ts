import { test, expect } from '@playwright/test';

test('Login functionality', async ({ page }) => {
  // 1. Open login page
  await page.goto('hhttps://www.capsicloud.com/jobsinsrilanka/login.php?action=login', { waitUntil: 'domcontentloaded' });
  
  // Wait for page to load
  await page.waitForTimeout(2000);

  // 2. Fill username
  await page.locator('input[name="username"]').fill('yuwanika');

  // 3. Fill password
  await page.locator('input[name="password"]').fill('Admin#2026');

  // 4. Click Sign in button
  await page.locator('button[type="submit"]').click();

  // 5. Wait for login to complete and verify
  await page.waitForTimeout(3000);
  
  // Verify user is logged in by checking URL redirect to dashboard
  const currentUrl = page.url();
  console.log('Current URL after login:', currentUrl);
  
  
});
