import { Controller, Get, Query } from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';

@Controller('nft-collection')
export class NftCollectionController {
  constructor(private readonly nftService: NftCollectionService) {}

  @Get()
  async getNftCollection(@Query('collectionId') collectionId: string) {
    return this.nftService.getNftCollection(collectionId);
  }
}
