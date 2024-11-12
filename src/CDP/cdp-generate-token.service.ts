import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { SignOptions, sign } from 'jsonwebtoken';
import * as crypto from 'crypto';
import { CDP_SECRET, COINBASE_DEVELOPER_API } from '../utils/constants';
import { validateAddress } from '../utils/helpers';

@Injectable()
export class CdpGenerateTokenService {
  async generateToken(address: string, blockchain: string): Promise<string> {
    if (!CDP_SECRET?.name || !CDP_SECRET?.privateKey) {
      throw new HttpException('CDP_SECRET is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const keyName = CDP_SECRET.name;
    const keySecret = CDP_SECRET.privateKey;
    const requestMethod = 'POST';
    const host = 'api.developer.coinbase.com';
    const requestPath = '/onramp/v1/token';
    const url = `${COINBASE_DEVELOPER_API}${requestPath}`;
    const uri = `${requestMethod} ${host}${requestPath}`;

    const payload = {
      iss: 'coinbase-cloud',
      nbf: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 120,
      sub: keyName,
      uri,
    };

    const signOptions: SignOptions = {
      algorithm: 'ES256',
      header: { kid: keyName, nonce: crypto.randomBytes(16).toString('hex') },
    };

    const jwt = sign(payload, keySecret, signOptions);

    const body = {
      destination_wallets: [{ address, blockchains: blockchain }],
    };

    try {
      const response = await axios.post(url, body, { headers: { Authorization: `Bearer ${jwt}` } });
      if (response.data.message) {
        throw new HttpException(response.data.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return response.data.token;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to generate token',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
