import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BtcNameResolveService } from './btc-name-resolve.service';

@Controller('resolve-btc-name')
export class BtcNameResolveController {
  constructor(private readonly btcNameResolveService: BtcNameResolveService) {}

  @Get(':domainName')
  async resolveBtcName(@Param('domainName') domainName: string, @Res() res: Response) {
    // Testnet support check
    if (process.env.NODE_ENV === 'testnet') {
      return res.status(HttpStatus.FORBIDDEN).json({ error: 'Testnet support is not yet available' });
    }

    try {
      const result = await this.btcNameResolveService.resolveBtcName(domainName);
      return res.json(result);
    } catch (error: any) {
      return res.status(error.getStatus ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message, code: error.code });
    }
  }
}
