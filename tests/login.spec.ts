import { test, expect } from '@playwright/test';

test('Login functionality', async ({ page }) => {
  // 1. Open login page
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/login.php?action=login', { waitUntil: 'domcontentloaded' });
  
  // Wait a bit for any dynamic content to load
  await page.waitForTimeout(2000);

  // 2. Fill email/username field
  await page.locator('input[name="username"]').fill('nikie@gmail.com');

  // 3. Fill password field
  await page.locator('input[name="password"]').fill('Yis1234#');

  // 4. Click Sign in button
  await page.locator('button[type="submit"]').click();

  // 5. Wait for login to complete
  await page.waitForTimeout(3000);
  
  // Verify user is logged in by checking URL
  const currentUrl = page.url();
  console.log('Current URL after login:', currentUrl);
  
  // Check if we're redirected to the dashboard (action=dashboard parameter)
  expect(currentUrl).toContain('action=dashboard');
});