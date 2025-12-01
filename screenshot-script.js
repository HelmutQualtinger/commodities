import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('http://localhost:4173/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshot.png', fullPage: false });
  console.log('Screenshot saved as screenshot.png');
  await browser.close();
})();
