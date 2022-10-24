import puppeteer from "puppeteer"

export const startBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--start-maximized", // you can also use '--start-fullscreen'
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto("https://app.deel.com/login");

  return {
    browser, page}
}