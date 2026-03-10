import fs from 'fs';
import path from 'path';
import { Env, BrowserType, TestConfig } from '@test/common/types';

const configPath = path.join(__dirname, 'test.config.json');

if (!fs.existsSync(configPath)) {
  throw new Error(`Config file not found at: ${configPath}`);
}

const raw = JSON.parse(fs.readFileSync(configPath, 'utf8'));
function resolveEnv(env: string): Env {
  if (!Object.values(Env).includes(env as Env)) {
    throw new Error(`Invalid environment: ${env}`);
  }
  return env as Env;
}

function resolveBrowser(browser: string): BrowserType {
  if (!Object.values(BrowserType).includes(browser as BrowserType)) {
    throw new Error(`Invalid browser type: ${browser}`);
  }
  return browser as BrowserType;
}
const envValue = process.env.TEST_ENV || raw.env;
const browserValue = process.env.BROWSER_TYPE || raw.browserType;
const testConfig: TestConfig = {
  env: resolveEnv(envValue),
  browserType: browserValue ? resolveBrowser(browserValue) : BrowserType.CHROMIUM,
  browserHeadless: process.env.CI ? true : (raw.browserHeadless ?? true),
  browserRecordVideo: raw.browserRecordVideo ?? true,
  browserDefaultTimeout: raw.browserDefaultTimeout ?? 60000,
  browserDefaultNavigationTimeout: raw.browserDefaultNavigationTimeout ?? 120000
};

export default testConfig;