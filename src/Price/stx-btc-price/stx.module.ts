import { Module } from '@nestjs/common';
import { PriceStxController } from './stx.controller';
import { PriceStxService } from './stx.service';

@Module({
  controllers: [PriceStxController],
  providers: [PriceStxService],
})
export class PriceStxModule {}
