import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import {
  HIRO_INSCRIPTIONS_API,
  BESTINSLOT_TESTNET_API,
  BESTINSLOT_API_KEY,
} from '../common/constants';

@Injectable()
export class InscriptionContentService {
  async fetchInscriptionContent(inscriptionId: string, isTestnet: boolean) {
    if (isTestnet) {
      if (!BESTINSLOT_API_KEY) {
        throw new HttpException(
          'Missing BESTINSLOT_API_KEY',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      try {
        const metadataUrl = `${BESTINSLOT_TESTNET_API}/inscription/single_info_id?inscription_id=${inscriptionId}`;
        const metadataResponse = await axios.get(metadataUrl, {
          headers: { 'x-api-key': BESTINSLOT_API_KEY },
        });
        const inscriptionData = metadataResponse.data?.data;

        if (!inscriptionData) {
          throw new HttpException('Inscription not found', HttpStatus.NOT_FOUND);
        }

        const contentResponse = await axios.get(inscriptionData.content_url, {
          headers: { 'x-api-key': BESTINSLOT_API_KEY },
        });
        return contentResponse.data;
      } catch (error: any) {
        this.handleError(error);
      }
    } else {
      try {
        const contentUrl = `${HIRO_INSCRIPTIONS_API}/${inscriptionId}/content`;
        const response = await axios.get(contentUrl);
        return response.data;
      } catch (error: any) {
        this.handleError(error);
      }
    }
  }

  private handleError(error: any) {
    const status = axios.isAxiosError(error)
      ? error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message || 'Failed to fetch inscription content'
      : 'An unexpected error occurred';

    throw new HttpException(message, status);
  }
}
