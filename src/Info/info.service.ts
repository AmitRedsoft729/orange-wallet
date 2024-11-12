import { Injectable } from '@nestjs/common';

@Injectable()
export class InfoService {
  getInfo() {
    const info = {
      stxSendTxMultiplier: 50,
      poolStackingTxMultiplier: 1000,
      otherTxMultiplier: 1,
      thresholdHighSatsFee: 20000,
      thresholdHighSatsPerByteRatio: 200,
      thresholdHighStacksFee: 1000000,
    };
    return {
      info,
    };
  }
}
