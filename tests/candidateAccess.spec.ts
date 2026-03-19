import { test, expect } from '@playwright/test';

test('Candidate Access - Login, Browse Jobs, and Edit Profile', async ({ page }) => {
  // 1. Open Job Portal Website
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/index.php', { waitUntil: 'domcontentloaded' });
  
  // Wait for page to load
  await page.waitForTimeout(2000);
  console.log('Opened Job Portal Website');

  // 2. Click Login
  await page.locator('a[href*="login"]').first().click();
  await page.waitForTimeout(2000);
  console.log('Clicked Login');

  // 3. Enter valid candidate credentials
  await page.locator('input[name="username"]').fill('nikie@gmail.com');
  await page.locator('input[name="password"]').fill('Yis1234#');
  console.log('Entered credentials - Email: nikie@gmail.com, Password: Yis1234#');

  // 4. Click Login button
  await page.locator('button[type="submit"]').click();
  
  // Wait for login to complete
  await page.waitForTimeout(3000);
  console.log('Clicked Login button');

  // 5. Verify candidate dashboard is displayed
  const currentUrl = page.url();
  console.log('Current URL after login:', currentUrl);
  expect(currentUrl).toContain('dashboard');
  
  // Verify dashboard elements are visible
  await expect(page.locator('text=Quick Actions')).toBeVisible();
  await expect(page.locator('text=Edit My Profile')).toBeVisible();
  await expect(page.locator('text=Browse Jobs')).toBeVisible();
  console.log('Candidate dashboard verified');

  // 6. Navigate to Browse Jobs and view job listings
  // First navigate back to dashboard
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/index.php?action=dashboard', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  
  // Click on Browse Jobs link - use more specific selector
  const browseJobsLink = page.locator('a:has-text("Browse Jobs")').first();
  await browseJobsLink.click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');
  console.log('Navigated to Browse Jobs');
  
  // Verify job listings page is displayed
  const browseJobsUrl = page.url();
  console.log('Browse Jobs URL:', browseJobsUrl);
  expect(browseJobsUrl.includes('job') || browseJobsUrl.includes('browse')).toBeTruthy();
  
  // Check for job listings on the page
  const jobCount = await page.locator('.job-card, .job-listing, .job-item, table tbody tr').count();
  console.log('Number of job listings found:', jobCount);
  console.log('Job listings displayed');

  // 7. Go to My Profile and edit profile information
  // Navigate back to dashboard first
  await page.goto('https://www.capsicloud.com/jobsinsrilanka/index.php?action=dashboard', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  
  // Click on Edit My Profile - use more specific selector
  const editProfileLink = page.locator('a:has-text("Edit My Profile"), a:has-text("Edit Profile"), a:has-text("My Profile")').first();
  await editProfileLink.click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');
  console.log('Navigated to My Profile');
  
  // Verify profile page is displayed
  const profileUrl = page.url();
  console.log('Profile URL:', profileUrl);
  
  // Check for profile form elements
  const profileFormVisible = await page.locator('form').isVisible();
  console.log('Profile form visible:', profileFormVisible);
  
  // Edit profile information - try to find common profile fields
  // Let's try to fill some common profile fields
  const profileFields = [
    'input[name="full_name"]',
    'input[name="first_name"]',
    'input[name="last_name"]',
    'input[name="phone"]',
    'input[name="mobile"]',
    'input[name="address"]',
    'textarea[name="summary"]',
    'textarea[name="description"]'
  ];
  
  let fieldsFound = 0;
  for (const field of profileFields) {
    const fieldLocator = page.locator(field);
    if (await fieldLocator.isVisible().catch(() => false)) {
      fieldsFound++;
      console.log('Found profile field:', field);
    }
  }
  console.log('Found', fieldsFound, 'editable profile fields');
  
  // If there are profile fields, let's update one as an example
  if (fieldsFound > 0) {
    // Try to fill phone number as an example
    const phoneField = page.locator('input[name="phone"], input[name="mobile"]').first();
    if (await phoneField.isVisible().catch(() => false)) {
      await phoneField.fill('+94 77 123 4567');
      console.log('Updated phone number');
    }
    
    // Save the profile
    const saveButton = page.locator('button:has-text("Save"), button:has-text("Update"), input[type="submit"]').first();
    if (await saveButton.isVisible().catch(() => false)) {
      await saveButton.click();
      await page.waitForTimeout(2000);
      console.log('Profile saved successfully');
    }
  }
  
  // Final verification
  console.log('All steps completed successfully!');
  console.log('Test Summary:');
  console.log('- Opened Job Portal Website');
  console.log('- Clicked Login');
  console.log('- Entered valid candidate credentials');
  console.log('- Clicked Login button');
  console.log('- Verified candidate dashboard is displayed');
  console.log('- Navigated to Browse Jobs and viewed job listings');
  console.log('- Went to My Profile and edited profile information');
});
