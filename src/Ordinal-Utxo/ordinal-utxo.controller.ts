import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrdinalUtxoService } from './ordinal-utxo.service';
import { ApiRequest } from '../common/helpers';

@Controller('ordinal-utxo')
export class OrdinalUtxoController {
  constructor(private readonly ordinalUtxoService: OrdinalUtxoService) {}

  @Get(':txid/:vout')
  async getOrdinalUtxo(
    @Param('txid') txid: string,
    @Param('vout') vout: string,
    @Req() req: ApiRequest,
    @Res() res: Response,
  ) {
    try {
      const utxoData = await this.ordinalUtxoService.fetchOrdinalUtxo(
        txid,
        vout,
        req.isTestnet,
      );
      return res.json(utxoData);
    } catch (error: any) {
      return res
        .status(error.getStatus ? error.getStatus() : 500)
        .json({ message: error.message, code: error.code });
    }
  }
}
