// Visits the Streamlit app in a real headless browser so it registers as
// genuine traffic (a plain HTTP ping just hits the static "asleep" page and
// doesn't reset Streamlit Cloud's inactivity timer). If the app is already
// asleep, this also clicks the "wake up" button and waits for it to boot.

const { chromium } = require('playwright');

const APP_URL = 'https://loan-portfolio-risk-dashboard-yajie.streamlit.app/';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating to', APP_URL);
  await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Let the page settle enough to show either the live app or the sleep screen
  await page.waitForTimeout(4000);

  const wakeButton = page.getByRole('button', { name: /get this app back up|wake/i });
  if (await wakeButton.count() > 0) {
    console.log('App is asleep — clicking wake-up button...');
    await wakeButton.first().click();
    // Booting a sleeping app can take up to ~60s
    await page.waitForTimeout(50000);
  } else {
    console.log('App already awake.');
  }

  // Give the WebSocket session a little extra time to register as real traffic
  await page.waitForTimeout(8000);

  console.log('Done — closing browser.');
  await browser.close();
})().catch((err) => {
  console.error('Ping failed:', err);
  process.exit(1);
});
