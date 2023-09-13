import { PlaywrightCrawler } from 'crawlee';

async function process(items) {
  for (let i = 0; i < items.length; i++) {
    const name = await items[i].getAttribute(`title`);
    const link = await items[i].getAttribute(`href`);
    const img = await items[i].locator(`img`).getAttribute(`src`);
    items[i] = new Item(name, link, img);
  }
  return items;
}

class Item {
  constructor(name, link, img) {
    this.name = name;
    this.link = link;
    this.img = img;
  }
}

class Type {
  constructor(name, items) {
    this.name = name;
    this.items = items;
  }
}

const crawler = new PlaywrightCrawler({
  async requestHandler({ page }) {
    const locator = page.locator('.tabs6 > li > a');
    const types = await locator.allTextContents();
    for (let i = 0; i < types.length; i++) {
      const items = await process(await page.locator(
        `.content${i+1} .gallery .gallerybox .thumb a`
      ).all());
      types[i] = new Type(types[i], items);
      console.log(types[i]);
    }
  },
});

await crawler.run(['https://liquipedia.net/mobilelegends/Portal:Equipment']);
