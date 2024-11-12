import { Injectable } from '@nestjs/common';
import { MEMPOOL_SPACE_API } from '../utils/constants';

@Injectable()
export class AppConfigService {
  getConfig() {
    return {
      btcApiURL: MEMPOOL_SPACE_API,
    };
  }
}
