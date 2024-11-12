import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto';
import { MOONPAY_KEY } from '../utils/constants';

@Injectable()
export class SignUrlService {
  async signUrl(url: string, isTestnet: boolean): Promise<any> {
    if (isTestnet) {
      throw new HttpException("Testnet support is not yet available", HttpStatus.FORBIDDEN);
    }

    const signature = crypto
      .createHmac('sha256', MOONPAY_KEY as string)
      .update(new URL(url).search)
      .digest('base64');

    const signedUrl = `${url}&signature=${encodeURIComponent(signature)}`;
    return { signedUrl };
  }
}
