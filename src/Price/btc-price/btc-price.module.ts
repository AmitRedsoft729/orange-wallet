import { Module } from '@nestjs/common';
import { BtcPriceService } from './btc-price.service';
import { BtcPriceController } from './btc-price.controller';

@Module({
  controllers: [BtcPriceController],
  providers: [BtcPriceService],
})
export class BtcPriceModule {}
