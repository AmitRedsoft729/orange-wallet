import { Injectable } from '@nestjs/common';
import { MEMPOOL_SPACE_API } from '../common/constants';

@Injectable()
export class AppConfigService {
  getConfig() {
    return {
      btcApiURL: MEMPOOL_SPACE_API,
    };
  }
}
