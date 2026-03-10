import { ApiBase } from './api-base';
import { TestConfig } from '@test/common/types';

export enum PetStatus {
  Available = 'available',
  Pending = 'pending',
  Sold = 'sold'
}

export class PetApi extends ApiBase {
  constructor(config: TestConfig) {
    super(config);
  }

  // Adding a new pet to the store
  async addPet(payload: Record<string, any>) {
    return this.apiRequest({
      method: 'POST',
      url: '/pet',
      data: payload
    });
  }
}
