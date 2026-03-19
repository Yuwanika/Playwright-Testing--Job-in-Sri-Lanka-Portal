import { test, expect } from '@playwright/test';

test('Job search displays results', async ({ page }) => {
  // 1. Open homepage
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/index.php', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 2. Enter "QA" in job search
  await page.fill('input[name="keyword"]', 'QA');

  // 3. Enter "Full-time" in Employment Type
  await page.selectOption('select[name="employment_type"]', { label: 'Full-time' });

  // 4. Click Search
  await page.click('button[type="submit"], input[type="submit"]');
  await page.waitForTimeout(3000);

  // 5. Verify jobs are displayed (or show no-results message)
  const bodyText = await page.locator('body').innerText();
  console.log('Page body text snippet:', bodyText.slice(0, 1000));

  // look for evidence of results in body text
  const hasResultsPhrase = bodyText.includes('Showing results for your search criteria');
  const exampleJobPresent = /Senior-Quality Assurance Engineer/i.test(bodyText);
  console.log('hasResultsPhrase=', hasResultsPhrase, 'exampleJobPresent=', exampleJobPresent);

  expect(hasResultsPhrase || exampleJobPresent).toBeTruthy();

  // after results display, click the first View Details link
  const firstDetail = page.locator('a', { hasText: 'View Details' }).first();
  if (await firstDetail.count() > 0) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      firstDetail.click(),
    ]);
    console.log('Navigated to job detail page:', page.url());
    // basic assertion that url contains job-details.php
    expect(page.url()).toContain('job-details.php');
  } else {
    console.warn('No View Details link found to click');
  }
});