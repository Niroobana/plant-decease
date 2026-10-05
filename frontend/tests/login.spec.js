import { test, expect } from '@playwright/test';

test('create user successfully', async ({ page }) => {
  const email = `testuser${Date.now()}@example.com`;

  await page.goto('/');

  await page.locator('input[type="text"]').fill('Test User');
  await page.locator('input[type="email"]').fill(email);

  await page.getByRole('button', { name: 'Add User' }).click();

  await expect(
    page.getByText('User created successfully')
  ).toBeVisible();

  await expect(
    page.getByText(`Test User - ${email}`)
  ).toBeVisible();
});