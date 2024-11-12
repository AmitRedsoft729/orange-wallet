import { Module } from '@nestjs/common';
import { Brc20TokenBalanceController } from './brc20-token-balance.controller';
import { Brc20TokenBalanceService } from './brc20-token-balance.service';

@Module({
  controllers: [Brc20TokenBalanceController],
  providers: [Brc20TokenBalanceService],
})
export class Brc20TokenBalanceModule {}
