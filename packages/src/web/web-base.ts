import fs from 'fs/promises';
import path from 'path';
import { BrowserType } from '../common/types';
import {
  chromium,
  firefox,
  webkit,
  type Browser,
  type BrowserContext,
  type Page
} from 'playwright';

export class WebBase {
  protected _browser!: Browser;
  protected _context!: BrowserContext;
  protected _activePage!: Page;

  constructor(
    protected browserType: BrowserType = BrowserType.CHROMIUM,
    protected headless = true,
    protected recordVideo = false
  ) {}

  public async create() {
    const browserMap = {
      [BrowserType.CHROMIUM]: chromium,
      [BrowserType.CHROME]: chromium,
      [BrowserType.MSEDGE]: chromium,
      [BrowserType.FIREFOX]: firefox,
      [BrowserType.WEBKIT]: webkit
    };

    this._browser = await browserMap[this.browserType].launch({ headless: this.headless });

    this._context = await this._browser.newContext({
      recordVideo: this.recordVideo
        ? { dir: path.join(process.cwd(), 'test-output/videos') }
        : undefined
    });

    this._activePage = await this._context.newPage();
    return this;
  }

  public get page(): Page {
    return this._activePage;
  }

  public async saveScreenshots(folder: string): Promise<string[]> {
    const outDir = path.resolve(process.cwd(), 'test-output', 'attachments', folder);
    await fs.mkdir(outDir, { recursive: true });

    const paths: string[] = [];
    for (const p of this._context.pages()) {
      const filePath = path.join(outDir, `screenshot-${Date.now()}.png`);
      await p.screenshot({ path: filePath, fullPage: true });
      paths.push(filePath);
    }
    return paths;
  }
  public getUrl(): string {
    return this._activePage.url();
  }
  public async close() {
    await this._context?.close();
    await this._browser?.close();
  }
}
