import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { API_TIMEOUT, CRYPTOCOMPARE_API, XVERSE_TESTNET_API } from '../../utils/constants';

@Injectable()
export class PriceStxService {
  async getStxPrice(isTestnet: boolean): Promise<any> {
    const apiUrl = isTestnet
      ? `${XVERSE_TESTNET_API}/v1/prices/stx/btc`
      : `${CRYPTOCOMPARE_API}?fsym=STX&tsyms=BTC`;
    try {
      const response = await axios.get(apiUrl, { timeout: API_TIMEOUT });
      return { stxBtcRate: response.data.BTC };
    } catch (error) {
      console.error("Error fetching STX/BTC price:", error);
      throw new HttpException("Failed to fetch STX/BTC price", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
