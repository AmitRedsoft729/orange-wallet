import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { HIRO_ORD } from '../utils/constants';

@Injectable()
export class Brc20TokenBalanceService {
  async getTokenBalance(address: string, token: string) {
    try {
      const apiUrl = `${HIRO_ORD}/v1/brc-20/balances/${address}?ticker=${token.toLowerCase()}`;
      const response = await axios.get(apiUrl);

      if (response.data.results.length !== 0) {
        return response.data.results;
      }

      return [
        {
          ticker: token.toLowerCase(),
          available_balance: '0',
          transferrable_balance: '0',
          overall_balance: '0',
        },
      ];
    } catch (error: any) {
      throw new HttpException(
        error?.response?.data?.message || 'Failed to fetch token balance',
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
