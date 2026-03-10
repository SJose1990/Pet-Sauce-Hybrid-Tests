import { cleanWebTest } from './test-cleaner';
import testConfig from '@test-config';
import { SauceDemo } from '@test/web/sauce-labs';

const user_credentials = {
  QA: {
    user: 'standard_user',
    password: 'secret_sauce'
  },
  LIVE: {
    user: 'standard_user',
    password: 'secret_sauce'
  }
}[testConfig.env];

describe('Sauce Demo checkout flow', () => {
  let sauceDemo: SauceDemo;

  beforeEach(async () => {
    // Initialize the test config settings
    sauceDemo = await new SauceDemo(testConfig).create();
  });

  test('TC-1: Verify successful completion of the end to end checkout process with valid user data.', async () => {
    // Login
    const loginPage = await sauceDemo.gotoLoginPage();
    const productPage = await loginPage.login(user_credentials.user, user_credentials.password);

    // Add Items to Cart
    await productPage.addProduct('Sauce Labs Backpack');
    await productPage.addProduct('Sauce Labs Bike Light');

    // Proceed to Checkout
    const cartPage = await productPage.goToCartFromProductPage();
    const checkoutPage = await cartPage.clickCheckout();

    // Complete Information and Continue
    await checkoutPage.fillInfo('Sherin', 'Ouseph', '12345');
    const overviewPage = await checkoutPage.clickContinueBtn();

    // Finish Checkout
    const checkoutCompletePage = await overviewPage.clickFinish();

    // Verification
    const successMsg = await checkoutCompletePage.getSuccessMessage();
    expect(successMsg).toBe('Thank you for your order!');

    // Logout
    await checkoutCompletePage.logout();
    const currentUrl = sauceDemo.getUrl();
    expect(currentUrl).toContain('saucedemo.com');
  });

  test('TC-2: Ensure checkout is prevented and validation errors are triggered when the postal code field is empty.', async () => {
    // Login
    const loginPage = await sauceDemo.gotoLoginPage();
    const productPage = await loginPage.login(user_credentials.user, user_credentials.password);

    // Add Items to Cart
    await productPage.addProduct('Sauce Labs Backpack');
    await productPage.addProduct('Sauce Labs Bike Light');

    // Navigation to Checkout
    const cartPage = await productPage.goToCartFromProductPage();
    const checkoutPage = await cartPage.clickCheckout();
    await checkoutPage.fillInfo('Sherin', 'Joseph', '');
    await checkoutPage.clickContinueBtn();

    //Error message due to missing zip code
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain('Error: Postal Code is required');
  });

  afterEach(async () => {
    await cleanWebTest([sauceDemo], expect.getState().assertionCalls === 0);
  });
});
