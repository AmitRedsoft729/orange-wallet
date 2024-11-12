import { Controller, Get, Param, Query } from '@nestjs/common';
import { BtcPriceService } from './btc-price.service';

@Controller('prices')
export class BtcPriceController {
  constructor(private readonly btcPriceService: BtcPriceService) {}

  @Get('btc/:currency')
  async getBtcPrice(
    @Param('currency') currency: string,
    @Query('isTestnet') isTestnet: boolean,
  ) {
    return this.btcPriceService.getBtcPrice(currency, isTestnet);
  }
}
