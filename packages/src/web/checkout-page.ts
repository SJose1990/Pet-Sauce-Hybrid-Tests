import { Locator, Page } from 'playwright';
import { CheckoutOverviewPage } from './checkout-overview';
import { BasePage } from './base-page';

export class CheckoutPage extends BasePage {
  private _first_name: Locator;
  private _last_name: Locator;
  private _zip: Locator;
  private _continue_btn: Locator;
  private _errorContainer: Locator;

  constructor(page: Page) {
    super(page);
    this._first_name = page.locator('css=#first-name');
    this._last_name = page.locator('css=#last-name');
    this._zip = page.locator('css=#postal-code');
    this._continue_btn = page.locator('css=#continue');
    this._errorContainer = this._page.locator('[data-test="error"]');
  }

  public async fillInfo(f: string, l: string, z: string) {
    await this._first_name.fill(f);
    await this._last_name.fill(l);
    await this._zip.fill(z);
  }

  public async clickContinueBtn() {
    await this._continue_btn.click();
    return new CheckoutOverviewPage(this._page);
  }

  async getErrorMessage(): Promise<string> {
    await this._errorContainer.waitFor({ state: 'visible', timeout: 5000 });
    const text = await this._errorContainer.innerText();
    return text.trim();
  }
}
