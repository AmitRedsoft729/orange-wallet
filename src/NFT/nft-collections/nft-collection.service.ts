import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getNftsCollectionData } from '../../common/gamma';

@Injectable()
export class NftCollectionService {
  async getNftCollection(collectionId: string) {
    if (!collectionId) {
      throw new HttpException(
        'Required Fields missing eg. collectionId',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    try {
      const nftCollection = await getNftsCollectionData(collectionId);
      return nftCollection;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
