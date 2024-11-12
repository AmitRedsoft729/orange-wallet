import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { HIRO_ORD } from '../common/constants';

@Injectable()
export class OrdinalsService {
  async getTokenBalances(address: string) {
    try {
      const response = await axios.get(`${HIRO_ORD}/v1/brc-20/balances/${address}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching token balances:', error);
      throw new InternalServerErrorException(error?.message || 'Failed to fetch token balances');
    }
  }

  async getTokenHistory(token: string, address: string) {
    try {
      const response = await axios.get(`${HIRO_ORD}/v1/brc-20/${token}/inscriptions/${address}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching token history:', error);
      throw new InternalServerErrorException(error?.message || 'Failed to fetch token history');
    }
  }
}
