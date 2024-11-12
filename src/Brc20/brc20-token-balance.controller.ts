import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Brc20TokenBalanceService } from './brc20-token-balance.service';

@Controller('brc-20/token')
export class Brc20TokenBalanceController {
  constructor(private readonly brc20TokenBalanceService: Brc20TokenBalanceService) {}

  @Get(':token/balance/:address')
  async getTokenBalance(
    @Param('token') token: string,
    @Param('address') address: string,
    @Res() res: Response,
  ) {
    try {
      const balanceData = await this.brc20TokenBalanceService.getTokenBalance(
        address,
        token,
      );
      return res.json(balanceData);
    } catch (error: any) {
      return res
        .status(error.getStatus ? error.getStatus() : 500)
        .json({ message: error.message, code: error.code });
    }
  }
}
