import { Env } from '../common/types';

export const PETSTORE_BASE_URLS: Record<Env, string> = {
  QA: 'https://petstore.swagger.io/v2',
  LIVE: 'https://petstore.swagger.io/v2'
};
