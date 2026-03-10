import { Page, Locator } from 'playwright';

export class BasePage {
  protected _page: Page;

  // Global Selectors which can be accessed in all the pages
  protected _burgerMenuBtn: Locator;
  protected _logoutLink: Locator;
  protected _shoppingCartBtn: Locator;

  constructor(page: Page) {
    this._page = page;
    this._burgerMenuBtn = page.locator('#react-burger-menu-btn');
    this._logoutLink = page.locator('#logout_sidebar_link');
    this._shoppingCartBtn = page.locator('.shopping_cart_link');
  }

  public async openMenu() {
    await this._burgerMenuBtn.click();
    await this._logoutLink.waitFor({ state: 'visible' });
  }

  public async logout() {
    await this.openMenu();
    await this._logoutLink.click();
  }

  public async goToCart() {
    await this._shoppingCartBtn.click();
  }
}
