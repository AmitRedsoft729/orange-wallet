import { Controller, Get, Param } from '@nestjs/common';
import { EthService } from './eth.service';

@Controller('eth')
export class EthController {
  constructor(private readonly ethService: EthService) {}

  @Get(':tokenContract/:tokenId')
  async getTokenUri(
    @Param('tokenContract') tokenContract: string,
    @Param('tokenId') tokenId: string,
  ) {
    return this.ethService.getTokenUri(tokenContract, tokenId);
  }
}
