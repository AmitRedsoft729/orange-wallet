import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { web3 } from '../config/web3';
import { ERC721_ABI } from '../common/constants';

@Injectable()
export class EthService {
  async getTokenUri(tokenContract: string, tokenId: string): Promise<string> {
    try {
      const contract = new web3.eth.Contract(ERC721_ABI, tokenContract);
      const tokenUri = await contract.methods.tokenURI(tokenId).call();
      return tokenUri;
    } catch (error) {
      throw new HttpException(
        { message: error.message, code: error.code },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
