import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { OrdinalsService } from './ordinals.service';
import { Response } from 'express';

@Controller('ordinals')
export class OrdinalsController {
  constructor(private readonly ordinalsService: OrdinalsService) {}

  @Get('token/balances/:address')
  async getTokenBalances(@Param('address') address: string, @Res() res: Response) {
    try {
      const balances = await this.ordinalsService.getTokenBalances(address);
      return res.status(HttpStatus.OK).json(balances);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get('token/:token/history/:address')
  async getTokenHistory(
    @Param('token') token: string,
    @Param('address') address: string,
    @Res() res: Response
  ) {
    try {
      const history = await this.ordinalsService.getTokenHistory(token, address);
      return res.status(HttpStatus.OK).json(history);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
