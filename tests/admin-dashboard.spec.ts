import { test, expect } from '@playwright/test';

test('Admin Dashboard View', async ({ page }) => {
  // 1. Open Job Portal Website
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/index.php', { waitUntil: 'domcontentloaded' });
  
  // Wait for page to load
  await page.waitForTimeout(2000);

  // 2. Click Login Button
  await page.locator('a[href*="login"]').first().click();

  // 3. Enter Admin Credentials
  await page.locator('input[name="username"]').fill('yuwanika');
  await page.locator('input[name="password"]').fill('Admin#2026');

  // 4. Click Login
  await page.locator('button[type="submit"]').click();

  // Wait for login
  await page.waitForTimeout(3000);
  
  // Verify URL contains dashboard
  const currentUrl = page.url();
  console.log('Current URL after login:', currentUrl);
  expect(currentUrl).toContain('dashboard');

  // 5. Verify Admin Dashboard Page
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // 6. Check Admin Dashboard Components
  await expect(page.locator('text=User Management')).toBeVisible();
  await expect(page.locator('text=Company Management')).toBeVisible();
  await expect(page.locator('text=Job Management')).toBeVisible();
  await expect(page.locator('text=Application Overview')).toBeVisible();
});