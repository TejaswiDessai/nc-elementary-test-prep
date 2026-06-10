import { test, expect } from '@playwright/test';

test('Complete quiz workflow: Grade K -> Math -> Quiz -> Results', async ({ page }) => {
  await page.goto('/');

  // Select Grade K
  await page.click('text=Kindergarten');

  // Select Math
  await page.click('text=Math');

  // Answer questions (assuming at least 1 question)
  // We click the first option for all questions until "Finish Test" appears
  let isFinished = false;
  while (!isFinished) {
    try {
      await page.click('button:has-text("Next Question"), button:has-text("Finish Test")');
      // If "Finish Test" was clicked, we should land on the result page
      if (await page.isVisible('text=Test Complete')) {
        isFinished = true;
      }
    } catch (e) {
      // If we can't find a button, we might be on the results page already
      if (await page.isVisible('text=Test Complete')) {
        isFinished = true;
      } else {
        throw e;
      }
    }
    
    // To avoid infinite loop if something fails
    const content = await page.content();
    if (content.includes('Test Complete')) isFinished = true;
  }

  // Verify Results
  await expect(page.locator('h1')).toContainText('Test Complete');
  await expect(page.locator('text=Score:')).toBeVisible();
});

test('Application does not crash on page reload mid-quiz', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Kindergarten');
  await page.click('text=Math');
  
  await page.reload();
  
  // Should be back at Grade selection or a stable state
  await expect(page.locator('text=Kindergarten')).toBeVisible();
});
