import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import NodeCache from 'node-cache';
import { COINGECKO_API, COINS } from '../common/constants';

const cache = new NodeCache({ stdTTL: 300 });

@Injectable()
export class CoinsService {
  async getCoinPrices(currency: string) {
    const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY'];
    if (!validCurrencies.includes(currency.toUpperCase())) {
      throw new InternalServerErrorException('Invalid currency');
    }

    const coinIds = COINS.map((coin) => coin.id).join(',');
    const cacheKey = `${currency}-${coinIds}-info`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
      try {
        const response = await axios.get(
          `${COINGECKO_API}/simple/price?ids=${coinIds}&vs_currencies=${currency.toLowerCase()}`,
        );

        if (!response?.data) {
          throw new InternalServerErrorException('Failed to fetch data');
        }

        const updatedCoins = COINS.map((coin) => ({
          ...coin,
          tokenFiatRate: response.data[coin.id]?.[currency.toLowerCase()] || 0,
        }));

        cache.set(cacheKey, updatedCoins);
        return updatedCoins;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 1 minute
        } else {
          throw new InternalServerErrorException('Failed to fetch coin prices');
        }
      }
      retries++;
    }

    throw new InternalServerErrorException('Max retries exceeded');
  }
}
