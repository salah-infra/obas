const { test, expect } = require('@playwright/test');

const PAGES = [
  '/site/index.html',
  '/site/services.html',
  '/site/about.html',
  '/site/case-studies.html',
  '/site/contact.html',
  '/site-onepage/index.html',
  '/site-onepage/ar.html',
];

test('arabic page is RTL with Arabic content', async ({ page }) => {
  await page.goto('/site-onepage/ar.html');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('h1')).toContainText('الأثر الرقمي');
});

const isMobile = (page) => {
  const vp = page.viewportSize();
  return !!vp && vp.width < 768;
};

// Theme/palette controls live in the nav on >=md, and inside the mobile menu on small
// screens — open the menu first on mobile so the controls are interactable.
async function revealControls(page) {
  if (isMobile(page)) await page.locator('[data-nav-toggle]').click();
}

// ---- Per-page health across every viewport (mobile / tablet / desktop) ----
for (const path of PAGES) {
  test.describe(path, () => {
    test('no console/page errors and no horizontal overflow', async ({ page }) => {
      const errors = [];
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.goto(path);
      await page.waitForTimeout(500);
      expect(errors, errors.join(' | ')).toEqual([]);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1
      );
      expect(overflow, 'page scrolls horizontally').toBeFalsy();
    });

    test('all <img> load (no broken images)', async ({ page }) => {
      await page.goto(path, { waitUntil: 'load' });
      // wait until every <img> reports complete (avoids flaky networkidle on the Tailwind CDN)
      await page.waitForFunction(
        () => Array.from(document.images).every((i) => i.complete),
        null,
        { timeout: 25000 }   // story slides are large; WebKit under parallel load needs headroom
      );
      const broken = await page.evaluate(() =>
        Array.from(document.images)
          .filter((i) => i.naturalWidth === 0)
          .map((i) => i.currentSrc || i.src)
      );
      expect(broken, broken.join(', ')).toEqual([]);
    });
  });
}

// ---- Mobile menu must not block content (the regression we fixed) ----
test.describe('mobile menu', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'mobile viewport only');
  });

  test('hidden by default, opens on toggle, closes on anchor tap', async ({ page }) => {
    await page.goto('/site-onepage/index.html');
    const menu = page.locator('[data-nav-menu]');
    await expect(menu).toBeHidden();                       // <- was permanently visible before the fix

    await page.locator('[data-nav-toggle]').click();
    await expect(menu).toBeVisible();

    // The one-pager is locked to a single theme (dark, Urban Loft, IBM Plex) — no theme/palette controls.
    await expect(page.locator('[data-nav-menu] [data-theme-toggle]')).toHaveCount(0);
    await expect(page.locator('[data-nav-menu] [data-palette-toggle]')).toHaveCount(0);

    await page.locator('[data-nav-menu] a[href^="#"]').first().click();
    await expect(menu).toBeHidden();
  });
});

// ---- Theme + palette controls work on every viewport ----
test.describe('theme + palette', () => {
  test('theme toggle switches to light and persists across reload', async ({ page }) => {
    await page.goto('/site/index.html');
    await revealControls(page);
    await page.locator('[data-theme-toggle]:visible').click();
    await expect(page.locator('html')).toHaveClass(/light/);
    await page.reload();                                   // applied pre-paint from localStorage
    await expect(page.locator('html')).toHaveClass(/light/);
  });

  test('palette picker re-skins via data-palette', async ({ page }) => {
    await page.goto('/site/index.html');
    await revealControls(page);
    await page.locator('[data-palette-toggle]:visible').click();
    await page.locator('.palette-opt[data-pal="teal"]').click();
    await expect(page.locator('html')).toHaveAttribute('data-palette', 'teal');
  });
});
