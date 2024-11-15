import { Module } from '@nestjs/common';
import { NftCollectionController } from './nft-collection.controller';
import { NftCollectionService } from './nft-collection.service';

@Module({
  controllers: [NftCollectionController],
  providers: [NftCollectionService],
})
export class NftCollectionModule {}
