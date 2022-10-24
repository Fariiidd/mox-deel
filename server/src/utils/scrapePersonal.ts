import { Page } from "puppeteer";

export const scrapePersonalInfo = async (page: Page) => {
  const data: any = {};

  await page.waitForSelector("div[data-qa=personal-details]");
  const rowData = await page.$$("div[data-qa=labeled-row]");

  data.token = await page.evaluate(() => {
    return localStorage.getItem("token");
  });

  for (const item of rowData) {
    const label = await item.$(".new-labeled-value-label");
    const value = await item.$(".semi-bold");

    const getLebel = await label?.evaluate((label) => label.innerHTML, label);
    const getValue = await value?.evaluate(
      (value) => (value as HTMLElement).innerText,
      value
    );

    data[getLebel as string] = getValue || "";
  }

  await page.goto("https://app.deel.com/");

  return data;
};
