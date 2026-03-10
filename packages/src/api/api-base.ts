import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TestConfig } from '@test/common/types';
import { PETSTORE_BASE_URLS } from './lookup';

export class ApiBase {
  protected client: AxiosInstance;

  constructor(config: TestConfig) {
    const baseUrl = PETSTORE_BASE_URLS[config.env];

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'QOPS-HYBRID-ENGINE'
      },
      timeout: config.browserDefaultTimeout
    });
  }
  public async apiRequest<T = any>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.client.request<T>({
      ...options,
      validateStatus: () => true
    });
  }
}
