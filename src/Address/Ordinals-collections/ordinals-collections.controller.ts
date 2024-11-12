import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { OrdinalCollectionService } from './ordinals-collections.service';
import { Request } from 'express';

@Controller('address')
export class OrdinalCollectionController {
  constructor(private readonly ordinalsService: OrdinalCollectionService) {}

  @Get(':address/ordinals/collections')
  async getOrdinalsCollections(
    @Param('address') address: string,
    @Query('limit') limit: number = 5,
    @Query('offset') offset: number = 0,
    @Req() req: Request,
  ) {
    const isTestnet = req['isTestnet'] || false;
    return this.ordinalsService.getCollections(address, limit, offset, isTestnet);
  }
}
