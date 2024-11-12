import { Controller, Get, Param, Req } from '@nestjs/common';
import { OrdinalInscriptionService } from './ordinals-inscriptions.service';
import { Request } from 'express';

@Controller('address')
export class OrdinalInscriptonController {
  constructor(private readonly ordinalsService: OrdinalInscriptionService) {}

  @Get(':address/ordinals/inscriptions/:inscriptionId')
  async getOrdinalInscription(
    @Param('inscriptionId') inscriptionId: string,
    @Req() req: Request,
  ) {
    const isTestnet = req['isTestnet'] || false;
    return this.ordinalsService.getOrdinalInscription(inscriptionId, isTestnet);
  }
}
