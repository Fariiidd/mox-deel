import puppeteer from "puppeteer";

let data: any = {};

const init = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--start-maximized", // you can also use '--start-fullscreen'
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto("https://app.deel.com/settings/account-settings");

  const inputEmail = await page.waitForSelector("#mui-1");
  const inputPassword = await page.waitForSelector("#mui-2");

  await inputEmail?.type("urielroodriguez26@gmail.com");
  await inputPassword?.type("@1Cordoba2423");
  await page.click("button[type=submit]");

  await page.waitForSelector(".popup-content-scroll");
  const inputModals = await page.$$(".MuiFormControl-root");

  for (const inputs of inputModals) {
    const input1 = await inputs.$("#mui-3");
    const input2 = await inputs.$("#mui-4");
    const input3 = await inputs.$("#mui-5");
    const input4 = await inputs.$("#mui-6");
    const input5 = await inputs.$("#mui-7");
    const input6 = await inputs.$("#mui-8");

    await input1?.type("6");
    await input2?.type("1");
    await input3?.type("1");
    await input4?.type("6");
    await input5?.type("2");
    await input6?.type("3");
  }

  await page.waitForSelector("div[data-qa=personal-details]");
  const rowData = await page.$$("div[data-qa=labeled-row]")
  
  data.token = await page.evaluate(() => {
    return localStorage.getItem('token');
  })  

  for (const item of rowData) {
    const label = await item.$(".new-labeled-value-label");
    const value = await item.$(".semi-bold");
    
    const getLebel = await label?.evaluate(label => label.innerHTML, label);
    const getValue = await value?.evaluate(value => (value as HTMLElement).innerText, value);
        
    data[getLebel as string] = getValue || "";
  }
  console.log(data);
};

init();
