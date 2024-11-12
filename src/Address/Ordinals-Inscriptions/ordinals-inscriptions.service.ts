import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import {
  HIRO_INSCRIPTIONS_API,
  BESTINSLOT_TESTNET_API,
  BESTINSLOT_API_KEY,
} from '../../common/constants';

@Injectable()
export class OrdinalInscriptionService {
  async getOrdinalInscription(inscriptionId: string, isTestnet: boolean) {
    if (isTestnet) {
      if (!BESTINSLOT_API_KEY) {
        throw new HttpException(
          { message: 'Missing BESTINSLOT_API_KEY' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      try {
        const apiUrl = `${BESTINSLOT_TESTNET_API}/inscription/single_info_id?inscription_id=${inscriptionId}`;
        const response = await axios.get(apiUrl, {
          headers: { 'x-api-key': BESTINSLOT_API_KEY },
        });
        const inscriptionData = response.data?.data;
        const genesis_block_height = response.data?.block_height;

        return {
          id: inscriptionData.inscription_id,
          number: inscriptionData.inscription_number,
          address: inscriptionData.wallet,
          genesis_address: inscriptionData.wallet,
          genesis_block_height,
          genesis_block_hash: '',
          genesis_fee: inscriptionData.genesis_fee,
          genesis_tx_id: inscriptionData.satpoint
            ? inscriptionData.satpoint.split(':')[0]
            : '',
          genesis_timestamp: inscriptionData.genesis_ts,
          tx_id: inscriptionData.satpoint
            ? inscriptionData.satpoint.split(':')[0]
            : '',
          location: inscriptionData.satpoint,
          output: inscriptionData.satpoint
            ? `${inscriptionData.satpoint.split(':')[0]}:0`
            : '',
          value: inscriptionData.output_value,
          offset: '0',
          sat_ordinal: '',
          sat_rarity: '',
          sat_coinbase_height: genesis_block_height,
          content_type: inscriptionData.mime_type,
          mime_type: inscriptionData.mime_type,
          content_length: inscriptionData.media_length,
          timestamp: inscriptionData.ts,
          curse_type: null,
          recursive: false,
          recursion_refs: null,
        };
      } catch (error: any) {
        console.error('Error fetching ordinal inscription:', error);
        throw new HttpException(
          { message: error?.message, code: error?.code },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      try {
        const apiUrl = `${HIRO_INSCRIPTIONS_API}/${inscriptionId}`;
        const response = await axios.get(apiUrl);
        return response.data;
      } catch (error: any) {
        console.error('Error fetching ordinal inscription:', error);
        throw new HttpException(
          { message: error?.message, code: error?.code },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
