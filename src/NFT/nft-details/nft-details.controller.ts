import { Controller, Get, Query } from '@nestjs/common';
import { NftDetailService } from './nft-details.service';

@Controller('nft-detail')
export class NftDetailController {
  constructor(private readonly nftService: NftDetailService) {}

  @Get()
  async getNftDetail(
    @Query('tokenId') tokenId: string,
    @Query('contractAddress') contractAddress: string,
    @Query('contractName') contractName: string,
  ) {
    return this.nftService.getNftDetail(tokenId, contractAddress, contractName);
  }
}
