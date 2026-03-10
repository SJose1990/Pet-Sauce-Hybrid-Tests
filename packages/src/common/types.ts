export enum Env {
  QA = 'QA',
  LIVE = 'LIVE'
}

export enum BrowserType {
  CHROMIUM = 'chromium',
  CHROME = 'chrome', 
  MSEDGE = 'msedge',
  FIREFOX = 'firefox',
  WEBKIT = 'webkit'
}

export interface TestConfig {
  env: Env;
  browserType: BrowserType;
  browserHeadless: boolean;
  browserRecordVideo: boolean;
  browserDefaultTimeout: number;
  browserDefaultNavigationTimeout: number;
}
