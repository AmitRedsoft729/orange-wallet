import { Controller, Get, Query } from '@nestjs/common';
import { FeeService } from './fee.service';


@Controller('fees')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Get('btc')
  async getBtcFees(@Query('isTestnet') isTestnet: boolean) {
    return this.feeService.getBtcFees(isTestnet);
  }
}
