import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html']],

  use: {
    baseURL: 'https://reqres.in/api', // ✅ base URL for API requests
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'api',
      use: {
        baseURL: 'https://reqres.in/api', // explicitly keep for request fixture
        trace: 'on-first-retry',
        // removed browserName completely
      },
    },
  ],
});
