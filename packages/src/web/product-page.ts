import { Locator, Page } from 'playwright';
import { CartPage } from './cart-page';
import { BasePage } from './base-page';

export class ProductPage extends BasePage {
  private _title: Locator;
  private _cart_link: Locator;

  constructor(page: Page) {
    super(page);
    this._title = page.locator('css=.title');
    this._cart_link = page.locator('css=.shopping_cart_link');
  }

  public title(): Locator {
    return this._title;
  }

  public async addProduct(item_name: string) {
    const formatted_id = item_name.toLowerCase().replace(/ /g, '-');
    await this._page.click(`css=#add-to-cart-${formatted_id}`);
  }

  public async goToCartFromProductPage() {
    await this._cart_link.click();
    return new CartPage(this._page);
  }
}
