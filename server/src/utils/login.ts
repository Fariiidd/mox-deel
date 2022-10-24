import { Page } from "puppeteer";

type data = {
  email: string
  pass: string
}

export const login = async (page: Page, data: data) => {
  const inputEmail = await page.waitForSelector("#mui-1");
  const inputPassword = await page.waitForSelector("#mui-2");

  await inputEmail?.type(data.email);
  await inputPassword?.type(data.pass);
  await page.click("button[type=submit]");
  
  await page.waitForSelector(".popup-content-scroll");
}