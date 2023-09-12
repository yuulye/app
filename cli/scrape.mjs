import { PlaywrightCrawler } from 'crawlee';

function trim(items) {
  for (let i = 0; i < items.length; i++) {
    items[i] = new Item(items[i].trim());
  }
  return items;
}

class Item {
  constructor(name) {
    this.name = name;
  }
}

class Type {
  constructor(name, items) {
    this.name = name;
    this.items = trim(items);
  }
}

const crawler = new PlaywrightCrawler({
  async requestHandler({ page }) {
    const locator = page.locator('.tabs6 > li > a');
    const types = await locator.allTextContents();
    for (let i = 0; i < types.length; i++) {
      const items = await page.locator(
        `.content${i+1} .gallerytext`
      ).allInnerTexts();
      types[i] = new Type(types[i], items);
      console.log(types[i]);
    }
  },
});

await crawler.run(['https://liquipedia.net/mobilelegends/Portal:Equipment']);
