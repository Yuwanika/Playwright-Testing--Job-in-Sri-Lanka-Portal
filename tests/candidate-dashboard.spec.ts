import { test, expect } from '@playwright/test';

test('Candidate Dashboard View', async ({ page }) => {
  // 1. Open Job Portal Website
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/index.php', { waitUntil: 'domcontentloaded' });
  
  // Wait for page to load
  await page.waitForTimeout(2000);

  // 2. Click Login Button
  await page.locator('a[href*="login"]').first().click();

  // 3. Enter Candidate Credentials
  await page.locator('input[name="username"]').fill('nikie@gmail.com');
  await page.locator('input[name="password"]').fill('Yis1234#');

  // 4. Click Login
  await page.locator('button[type="submit"]').click();

  // Wait for login
  await page.waitForTimeout(3000);
  
  // Verify URL contains dashboard
  const currentUrl = page.url();
  console.log('Current URL after login:', currentUrl);
  expect(currentUrl).toContain('dashboard');

  // 5. Check Dashboard Elements
  await expect(page.locator('text=Quick Actions')).toBeVisible();
  await expect(page.locator('text=Edit My Profile')).toBeVisible();
  await expect(page.locator('text=Browse Jobs')).toBeVisible();
});