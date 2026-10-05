import { test, expect } from '@playwright/test';

test('add plant successfully', async ({ page }) => {
  const plantName = `Rose-${Date.now()}`;

  await page.goto('/plants');

  await page.getByLabel('Plant Name').fill(plantName);
  await page.getByLabel('Plant Type').fill('Flower');
  await page.getByLabel('Location').fill('Jaffna');

  await page.getByLabel('Owner').selectOption({ index: 1 });

  await page.getByRole('button', { name: 'Add Plant' }).click();

  await expect(
    page.getByText('Plant added successfully')
  ).toBeVisible();

  await expect(
    page.getByText(plantName)
  ).toBeVisible();
});