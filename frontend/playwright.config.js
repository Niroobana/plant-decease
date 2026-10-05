// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run test files in parallel
  fullyParallel: true,

  // Fail on CI if test.only is accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry only in CI
  retries: process.env.CI ? 2 : 0,

  // Use one worker in CI, normal workers locally
  workers: process.env.CI ? 1 : undefined,

  // Generate HTML report
  reporter: 'html',

  // Shared settings for all tests
  use: {
    baseURL: 'http://localhost:5173',

    // Use installed Google Chrome
    channel: 'chrome',

    // Show browser while learning/debugging
    headless: false,

    // Collect trace on first retry
    trace: 'on-first-retry',

    // Take screenshot only when a test fails
    screenshot: 'only-on-failure',

    // Keep video only when a test fails
    video: 'off',
  },

  // For now use only Google Chrome
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],

  // Start React/Vite automatically before tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 420000,
  },
});