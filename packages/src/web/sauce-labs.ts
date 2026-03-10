import { TestConfig } from '../common/types';            
import { WebBase } from './web-base';
import { LoginPage } from './login';
import { SAUCE_LOGIN_URL } from './lookup';

export class SauceDemo extends WebBase {
  private readonly cfg: TestConfig;

  constructor(config: TestConfig) {
    super(config.browserType, config.browserHeadless, config.browserRecordVideo);
    this.cfg = config; 
  }

  public async create() {
    await super.create();
    return this;
  }

  public async gotoLoginPage() {
    const loginUrl = SAUCE_LOGIN_URL[this.cfg.env];
    if (!loginUrl) {
      throw new Error(`No SauceDemo login URL configured for env "${this.cfg.env}"`);
    }
    await this.page.goto(loginUrl);
    return new LoginPage(this.page);
  }
}