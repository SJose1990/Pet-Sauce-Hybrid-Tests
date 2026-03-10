import { Locator, Page } from 'playwright';
import { BasePage } from './base-page';
import { CheckoutCompletePage } from './checkout-complete';

export class CheckoutOverviewPage extends BasePage {
  private _finish_btn: Locator;

  constructor(page: Page) {
    super(page);
    this._finish_btn = page.locator('css=#finish');
  }

  public async clickFinish() {
    await this._finish_btn.click();
    return new CheckoutCompletePage(this._page);
  }
}
