import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getNftDetail } from '../../utils/gamma';

@Injectable()
export class NftDetailService {
  async getNftDetail(
    tokenId: string,
    contractAddress: string,
    contractName: string,
  ) {
    if (!tokenId || !contractAddress || !contractName) {
      throw new HttpException(
        'Required Fields missing eg. tokenId, contractAddress & contractName',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    try {
      const nftDetail = await getNftDetail(
        tokenId,
        contractAddress,
        contractName,
      );
      return nftDetail;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
