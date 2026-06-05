const { defineConfig, devices } = require('@playwright/test');

// Serves the repo root (parent of e2e/) so tests hit /site/* and /site-onepage/*.
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'python3 -m http.server 4173 --directory ..',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    { name: 'mobile',  use: { ...devices['iPhone 13'] } },                       // 390x844, touch
    { name: 'tablet',  use: { viewport: { width: 834, height: 1112 } } },         // iPad-ish
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
});
