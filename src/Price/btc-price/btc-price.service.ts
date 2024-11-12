import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { MEMPOOL_SPACE_API, XVERSE_TESTNET_API } from '../../utils/constants';

const VALID_CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "CHF", "JPY"];

@Injectable()
export class BtcPriceService {
  async getBtcPrice(currency: string, isTestnet: boolean): Promise<any> {
    if (!currency || typeof currency !== 'string') {
      throw new HttpException("Missing or invalid currency parameter", HttpStatus.BAD_REQUEST);
    }

    const normalizedCurrency = currency.toUpperCase();
    if (!VALID_CURRENCIES.includes(normalizedCurrency)) {
      throw new HttpException("Invalid currency", HttpStatus.BAD_REQUEST);
    }

    const apiUrl = isTestnet
      ? `${XVERSE_TESTNET_API}/v1/prices/btc/${normalizedCurrency}`
      : `${MEMPOOL_SPACE_API}/v1/prices`;

    try {
      const response = await axios.get(apiUrl);
      return isTestnet
        ? response.data
        : { btcFiatRate: response.data[normalizedCurrency] };
    } catch (error) {
      console.error("Error fetching BTC price:", error);
      if (axios.isAxiosError(error)) {
        throw new HttpException(
          error.response?.data?.error || "Failed to fetch BTC price",
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      throw new HttpException("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
