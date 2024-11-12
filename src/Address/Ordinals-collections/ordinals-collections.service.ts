import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import {
  HIRO_INSCRIPTIONS_API,
  BESTINSLOT_TESTNET_API,
  BESTINSLOT_API_KEY,
} from '../../utils/constants';

@Injectable()
export class OrdinalCollectionService {
  async getCollections(address: string, limit = 5, offset = 0, isTestnet: boolean) {
    if (!BESTINSLOT_API_KEY && isTestnet) {
      throw new HttpException(
        { message: 'Missing BESTINSLOT_API_KEY' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      let apiUrl: string;
      if (isTestnet) {
        apiUrl = `${BESTINSLOT_TESTNET_API}/wallet/inscriptions?address=${address}&sort_by=inscr_num&order=desc&count=${limit}&offset=${offset}`;
        const response = await axios.get(apiUrl, {
          headers: { 'x-api-key': BESTINSLOT_API_KEY },
        });
        const inscriptionsData = response.data?.data || [];
        return {
          offset,
          limit,
          total_inscriptions: inscriptionsData.length || 0,
          total: inscriptionsData.length || 0,
          results: inscriptionsData.map((data: any) => ({
            category: null,
            collection_id: null,
            collection_name: null,
            thumbnail_inscriptions: [
              {
                id: data.inscription_id,
                content_type: data.mime_type,
                number: data.inscription_number,
              },
            ],
            total_inscriptions: 1,
          })),
        };
      } else {
        apiUrl = `${HIRO_INSCRIPTIONS_API}?address=${address}&limit=${limit}&offset=${offset}`;
        const response = await axios.get(apiUrl);
        const inscriptionsData = response.data?.results || [];
        return {
          offset,
          limit,
          total_inscriptions: response.data?.total || 0,
          total: inscriptionsData.length || 0,
          results: inscriptionsData.map((data: any) => ({
            category: null,
            collection_id: null,
            collection_name: null,
            thumbnail_inscriptions: [
              {
                id: data.id,
                content_type: data.content_type,
                number: data.number,
              },
            ],
            total_inscriptions: 1,
          })),
        };
      }
    } catch (error: any) {
      console.error('Error fetching ordinals collections:', error);
      throw new HttpException(
        { message: error?.message, code: error?.code },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
