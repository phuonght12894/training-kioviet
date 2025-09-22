import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://fnb.kiotviet.vn/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Đăng nhập/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://fnb.kiotviet.vn/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Quên mật khẩu' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Quên mật khẩu' })).toBeVisible();
});
