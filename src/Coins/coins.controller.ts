import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { Response } from 'express';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Post()
  async getCoinPrices(@Body('currency') currency: string, @Res() res: Response) {
    if (!currency) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Missing currency' });
    }

    try {
      const coinData = await this.coinsService.getCoinPrices(currency);
      return res.status(HttpStatus.OK).json(coinData);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
