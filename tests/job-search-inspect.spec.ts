import { test } from '@playwright/test';

test('Inspect job search page', async ({ page }) => {
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/index.php');
  await page.waitForTimeout(3000);

  const inputs = await page.locator('input, select').all();
  console.log(`Found ${inputs.length} inputs/selects`);
  for (let i = 0; i < inputs.length; i++) {
    const tag = await inputs[i].evaluate(e => e.tagName);
    const type = await inputs[i].getAttribute('type');
    const name = await inputs[i].getAttribute('name');
    const id = await inputs[i].getAttribute('id');
    const placeholder = await inputs[i].getAttribute('placeholder');
    console.log(`Element ${i}: <${tag} type=${type} name=${name} id=${id} placeholder=${placeholder}>`);
    if (name === 'employment_type') {
      const options = await inputs[i].locator('option').allTextContents();
      console.log('Employment type options:', options);
    }
  }
  await page.screenshot({ path: 'job-search-page.png' });

  // perform a sample search for QA full-time
  await page.fill('input[name="keyword"]','QA ');
  await page.selectOption('select[name="employment_type"]',{ label:'Full-time'});
  // try clicking search with criteria
  await page.click('button[type="submit"], input[type="submit"]');
  await page.waitForTimeout(3000);
  let results = await page.locator('table tr, .job-listing, .job-card').all();
  console.log('Results count after criteria search:', results.length);

  // if no results, try a blank search
  if (results.length === 0) {
    console.log('No results found with criteria, trying blank search');
    await page.click('button[type="submit"], input[type="submit"]');
    await page.waitForTimeout(3000);
    results = await page.locator('table tr, .job-listing, .job-card').all();
    console.log('Results count after blank search:', results.length);
  }
});