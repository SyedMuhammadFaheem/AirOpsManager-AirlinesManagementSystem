import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load server/.env so DB_HOST/DB_USER/DB_PASSWORD/JWT_SECRET are inherited;
// DB_NAME/ALLOWED_ORIGIN/PORT are overridden below for the webServer processes.
dotenv.config({ path: path.resolve(__dirname, '../server/.env') });

const serverEnv = {
  ...process.env,
  DB_NAME: 'airport_management_test',
  ALLOWED_ORIGIN: 'http://localhost:3000',
  PORT: '5001',
};

const clientEnv = {
  ...process.env,
  PORT: '3000',
  REACT_APP_API_URL: 'http://localhost:5001',
  BROWSER: 'none',
};

export default defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('./scripts/global-setup'),
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['html'], ['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: [
    {
      command: 'npm run dev',
      cwd: path.resolve(__dirname, '../server'),
      env: serverEnv,
      port: 5001,
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
    {
      command: 'npm start',
      cwd: path.resolve(__dirname, '../client'),
      env: clientEnv,
      port: 3000,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
