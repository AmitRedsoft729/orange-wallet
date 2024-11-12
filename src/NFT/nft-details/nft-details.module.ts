import { Module } from '@nestjs/common';
import { NftDetailController } from './nft-details.controller';
import { NftDetailService } from './nft-details.service';

@Module({
  controllers: [NftDetailController],
  providers: [NftDetailService],
})
export class NftDetailModule {}
