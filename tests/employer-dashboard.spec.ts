import { test, expect } from '@playwright/test';

test('Employer Dashboard View', async ({ page }) => {
  // 1. Open website
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/index.php', { waitUntil: 'domcontentloaded' });
  
  // Wait for page to load
  await page.waitForTimeout(2000);

  // Navigate to login page (assuming there's a login link or button)
  await page.locator('a[href*="login"]').first().click(); // Adjust selector as needed

  // 2. Login as Employer
  await page.locator('input[name="username"]').fill('yuwanika-manager');
  await page.locator('input[name="password"]').fill('Yis12345');

  // 3. Click Login Button
  await page.locator('button[type="submit"]').click();

  // 4. Wait for login and navigate to dashboard
  await page.waitForTimeout(3000);
  
  // Verify URL contains dashboard
  const currentUrl = page.url();
  console.log('Current URL after login:', currentUrl);
  expect(currentUrl).toContain('dashboard');

  // 5. Verify Employer Dashboard Page
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible(); // Adjust based on actual text

  // 6. Check Dashboard Elements
  // Candidate Management
  await expect(page.locator('text=Candidate')).toBeVisible();
  
  // Application Management
  await expect(page.locator('text=Application')).toBeVisible();
  
  // Profile setting
  await expect(page.locator('text=Settings')).toBeVisible();

  // 7. Try accessing restricted modules
  // Company management
  await page.locator('text=Company').click();
  await page.waitForTimeout(2000);
  // Check if access is denied (assuming error message or URL change)
  await expect(page.locator('text=Access Denied')).toBeVisible(); // Adjust based on actual error

  // Go back to dashboard
  await page.locator('text=Dashboard').first().click();
  await page.waitForTimeout(2000);

  // Job Management
  await page.locator('text=Jobs').click();
  await page.waitForTimeout(2000);
  await expect(page.locator('text=Access Denied')).toBeVisible();

  // Go back
  await page.locator('text=Dashboard').first().click();
  await page.waitForTimeout(2000);

  // Approval & Publishing
  await page.locator('text=Approval & Publishing').click();
  await page.waitForTimeout(2000);
  await expect(page.locator('text=Access Denied')).toBeVisible();

  // Go back
  await page.locator('text=Dashboard').first().click();
  await page.waitForTimeout(2000);

  // System Settings
  await page.locator('text=Settings').click();
  await page.waitForTimeout(2000);
  await expect(page.locator('text=Access Denied')).toBeVisible();
});