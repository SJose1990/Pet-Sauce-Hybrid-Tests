import { Page, Locator } from 'playwright';
import { BasePage } from './base-page';

export class CheckoutCompletePage extends BasePage {
  private _successHeader: Locator;

  constructor(page: Page) {
    super(page);
    this._successHeader = page.locator('.complete-header');
  }

  public async getSuccessMessage() {
    await this._successHeader.waitFor({ state: 'visible' });
    return await this._successHeader.innerText();
  }
}
