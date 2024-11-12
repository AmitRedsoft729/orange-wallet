import { Controller, Get, Query } from '@nestjs/common';
import { PriceStxService } from './stx.service';

@Controller('prices')
export class PriceStxController {
  constructor(private readonly priceStxService: PriceStxService) {}

  @Get('stx/btc')
  async getStxPrice(@Query('isTestnet') isTestnet: boolean) {
    return this.priceStxService.getStxPrice(isTestnet);
  }
}
