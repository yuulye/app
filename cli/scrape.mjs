import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
  async requestHandler({ page }) {
    const locator = page.locator('.tabs6 > li > a');
    const items = await locator.allTextContents();
    console.log(items);
  },
});

await crawler.run(['https://liquipedia.net/mobilelegends/Portal:Equipment']);
