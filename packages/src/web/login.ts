import { Locator, Page } from 'playwright';
import { ProductPage } from './product-page';

export class LoginPage {
  private _page: Page;
  private _u_name: Locator;
  private _p_word: Locator;
  private _l_btn: Locator;

  constructor(page: Page) {
    this._page = page;
    this._u_name = page.locator('css=#user-name');
    this._p_word = page.locator('css=#password');
    this._l_btn = page.locator('css=#login-button');
  }

  public async login(user: string, pass: string) {
    await this._u_name.fill(user);
    await this._p_word.fill(pass);
    await this._l_btn.click();
    return new ProductPage(this._page);
  }

  public async getErrorMessage(): Promise<string | null> {
    return await this._page.locator('css=[data-test="error"]').textContent();
  }
}
