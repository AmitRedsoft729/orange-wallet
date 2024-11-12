import { Module } from '@nestjs/common';
import { BtcNameResolveController } from './btc-name-resolve.controller';
import { BtcNameResolveService } from './btc-name-resolve.service';

@Module({
  controllers: [BtcNameResolveController],
  providers: [BtcNameResolveService],
})
export class BtcNameResolveModule {}
