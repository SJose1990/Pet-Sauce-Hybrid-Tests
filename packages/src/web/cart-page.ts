import { Locator, Page } from 'playwright';
import { CheckoutPage } from './checkout-page';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  private _chk_btn: Locator;

  constructor(page: Page) {
    super(page);
    this._chk_btn = page.locator('css=#checkout');
  }

  public async clickCheckout() {
    await this._chk_btn.click();
    return new CheckoutPage(this._page);
  }
}
