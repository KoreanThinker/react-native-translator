// In unit test, we can't check the actual translation result because webview is mocked
// so periodically check url, query-selector and acture result using puppteer.

import _ from 'lodash';
import puppeteer from 'puppeteer';
import translators from './translators';

// testing multi-line input
const input = `hi how are you


what is your name?
`;
// check only core words
const output1 = /안녕/;
const output2 = /이름/;

(async () => {
  const browser = await puppeteer.launch({headless: false});

  for (const translator of _.values(translators)) {
    const url = translator.toUrl('en', 'ko', input);
    const selector = translator.selector;

    const page = await browser.newPage();
    await page.goto(url);

    let count = 0;
    const maxCount = 10;
    const delay = 1000;
    async function validate() {
      try {
        const element = await page.waitForSelector(selector);
        if (!element) {
          throw new Error('Selector is not valid');
        }
        const result = await element.evaluate((el: any) => el.innerText);
        if (!output1.test(result)) {
          //@ts-ignore
          throw new Error('Translation failed for hello', {cause: {result}});
        }
        if (!output2.test(result)) {
          //@ts-ignore
          throw new Error('Translation failed for name', {cause: {result}});
        }
      } catch (error) {
        if (count >= maxCount) {
          throw error;
        }
        count++;
        await new Promise(resolve => setTimeout(resolve, delay));
        await validate();
      }
    }

    await validate();

    await page.close();
  }

  await browser.close();
})();
