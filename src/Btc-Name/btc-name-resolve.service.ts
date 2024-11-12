import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { API_TIMEOUT, STACKS_DOMAINS_API } from '../utils/constants';

@Injectable()
export class BtcNameResolveService {
  async resolveBtcName(domainName: string): Promise<{ isResolved: boolean; address: string | null }> {
    if (!/^.+\.btc$/.test(domainName)) {
      throw new HttpException(
        "Invalid domain name format. It should be in the format '*.btc'.",
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const { data } = await axios.get(`${STACKS_DOMAINS_API}/names/${domainName}`, {
        timeout: API_TIMEOUT,
      });

      const isResolved = data && data.address && data.address.trim() !== '';
      return { isResolved, address: isResolved ? data.address : null };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
        // Timeout error
        return { isResolved: false, address: null };
      }
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
