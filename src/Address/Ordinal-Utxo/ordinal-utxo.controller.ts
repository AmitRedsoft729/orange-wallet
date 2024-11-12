import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { OrdinalAddressUtxoService } from './ordinal-utxo.service';
import { Request } from 'express';

@Controller('address')
export class OrdinalAddressUtxoController {
  constructor(private readonly ordinalsService: OrdinalAddressUtxoService) {}

  @Get(':address/ordinal-utxo')
  async getOrdinalAddressUtxo(
    @Param('address') address: string,
    @Query() queryParams: any,
    @Req() req: Request,
  ) {
    const isTestnet = req['isTestnet'] || false;
    return this.ordinalsService.getOrdinalAddressUtxo(address, isTestnet, queryParams);
  }
}
