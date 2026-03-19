import { test, expect } from '@playwright/test';

test('Login functionality', async ({ page }) => {
  // 1. Open login page
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/login.php?action=login');

  // 2. Enter valid email
  await page.fill('input[type="email"]', 'nikie@gmail.com');

  // 3. Enter password
  await page.fill('input[type="password"]', 'Yis1234#');

  // 4. Click Sign in button
  await page.click('button[type="submit"]');

  // 5. Verify dashboard page
  await expect(page).toHaveURL(/dashboard/);
});