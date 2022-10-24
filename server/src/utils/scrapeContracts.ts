import { Page } from "puppeteer";

export const scrapeContracts = async (page: Page) => {
  const contracts = [];

  await page.waitForSelector(".odd-table");

  const table = await page.$("table.odd-table");

  if (table) {
    const rows = await table.$$("td");

    for (let i = 0; i < rows.length; i++) {
      await page.evaluate((element) => element.click(), rows[i]);

      await page.goto(`${page.url()}/details`);

      await page.waitForSelector("[data-qa=labeled-row]");

      const data = await page.$$("[data-qa=labeled-row]");

      let contract: any = {};

      for (let j = 0; j < data.length; j++) {
        //console.log((await data[j].getProperty('textContent')).toString())
        let titleText = "";
        let descText = "";

        const title = await data[j].$("[data-qa='label-info']");
        if (title) {
          titleText = (await title.getProperty("textContent"))
            .toString()
            .replace("JSHandle:", "");
        }
        const desc = await data[j].$(".semi-bold");
        if (desc) {
          descText = (await desc.getProperty("textContent"))
            .toString()
            .replace("JSHandle:", "");
        }

        contract[titleText] = descText;
      }

      contracts.push(contract);

      await page.goto("https://app.deel.com/");
    }
  }

  return contracts;
};
