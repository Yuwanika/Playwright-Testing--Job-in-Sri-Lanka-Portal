import { test, expect } from '@playwright/test';

test('Registration functionality', async ({ page }) => {
  // 1. Open Home Page
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/index.php', { waitUntil: 'domcontentloaded' });

  // Wait for page to load
  await page.waitForTimeout(2000);

  // 2. Click Sign Up Button
  await page.locator('a:has-text("Sign Up")').first().click();

  // 3. Verify Sign Up Page loads successfully
  await expect(page).toHaveURL(/.*signup|register.*/); // Adjust URL pattern as needed

  // Wait for form to load
  await page.waitForTimeout(2000);

  // 4. Enter Valid Details
  await page.locator('input[name="first_name"]').fill('Teenuhansa');
  await page.locator('input[name="last_name"]').fill('Jaya');
  await page.locator('input[name="email"]').fill('teenu' + Date.now() + '@gmail.com');
  await page.locator('input[name="phone"]').fill('0775674564');
  await page.locator('textarea[name="address"]').fill('Awissawella');
  await page.locator('input[name="city"]').fill('Awissawella');
  await page.locator('input[name="country"]').fill('Sri Lanka');
  await page.locator('input[name="password"]').fill('Teenu@1234');
  await page.locator('input[name="password_confirm"]').fill('Teenu@1234');

  // 5. Click Sign Up
  await page.locator('button:has-text("Sign Up")').click();

  // Wait for navigation or response
  await page.waitForTimeout(3000);

  // Take screenshot for debugging
  await page.screenshot({ path: 'registration-result.png' });

  // 6. Verify Success Message
  await expect(page.locator('text=Registration successful! Your account is pending approval. You will be able to login once your account is approved by an administrator.')).toBeVisible();
});