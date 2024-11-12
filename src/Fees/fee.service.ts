import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import {
  API_TIMEOUT,
  BLOCKCHAIN_INFO_API,
  XVERSE_TESTNET_API,
} from '../common/constants';

@Injectable()
export class FeeService {
  async getBtcFees(isTestnet: boolean): Promise<any> {
    const apiUrl = isTestnet
      ? `${XVERSE_TESTNET_API}/v1/fees/btc`
      : BLOCKCHAIN_INFO_API;
    try {
      const response = await axios.get(apiUrl, { timeout: API_TIMEOUT });
      return response.data;
    } catch (error) {
      console.error('Error fetching BTC fees:', error);
      if (axios.isAxiosError(error)) {
        throw new HttpException(
          error.response?.data || 'Failed to fetch BTC fees',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
