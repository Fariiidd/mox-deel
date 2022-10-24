import { Page } from "puppeteer";

export const otp = async (page: Page, otp: string) => {
  for (let index = 3; index <= 8; index++) {
    const input = await page.$(`#mui-${index}`);
    await input?.type(otp[index - 3]);
  }

  try {
    await page.waitForSelector("div[role=alert]", { timeout: 3000 });
    return 1;
  } catch {
    return 0;
  }
};
