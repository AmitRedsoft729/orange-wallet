import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { XVERSE_MAINNET_API, XVERSE_TESTNET_API } from '../utils/constants';

@Injectable()
export class OrdinalUtxoService {
  async fetchOrdinalUtxo(txid: string, vout: string, isTestnet: boolean) {
    const apiUrl = isTestnet
      ? `${XVERSE_TESTNET_API}/v1/ordinal-utxo/${txid}:${vout}`
      : `${XVERSE_MAINNET_API}/v1/ordinal-utxo/${txid}:${vout}`;

    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    const status = axios.isAxiosError(error)
      ? error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message || 'Failed to fetch ordinal UTXO'
      : 'An unexpected error occurred';

    throw new HttpException(message, status);
  }
}
