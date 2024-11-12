import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { XVERSE_MAINNET_API, XVERSE_TESTNET_API } from '../../common/constants';

@Injectable()
export class OrdinalAddressUtxoService {
  async getOrdinalAddressUtxo(
    address: string,
    isTestnet: boolean,
    queryParams: any,
  ) {
    const { offset, limit, hideInscriptionOnly, hideUnconfirmed } = queryParams;

    const params = {
      offset,
      limit,
      hideInscriptionOnly,
      hideUnconfirmed,
    };

    // Determine the API URL based on whether it's testnet or mainnet
    const apiUrl = isTestnet
      ? `${XVERSE_TESTNET_API}/v1/address/${address}/ordinal-utxo`
      : `${XVERSE_MAINNET_API}/v1/address/${address}/ordinal-utxo`;

    try {
      const response = await axios.get(apiUrl, { params });
      console.log(params); // For debugging purposes
      return response.data;
    } catch (error: any) {
      console.error('Error fetching ordinal address UTXO:', error);
      const status = axios.isAxiosError(error)
        ? error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
        : HttpStatus.INTERNAL_SERVER_ERROR;
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to fetch ordinal address UTXO'
        : 'An unexpected error occurred';

      throw new HttpException({ message, code: error?.code }, status);
    }
  }
}
