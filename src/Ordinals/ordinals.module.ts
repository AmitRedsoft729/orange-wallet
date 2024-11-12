import { Module } from '@nestjs/common';
import { OrdinalsController } from './ordinals.controller';
import { OrdinalsService } from './ordinals.service';

@Module({
  controllers: [OrdinalsController],
  providers: [OrdinalsService],
})
export class OrdinalsModule {}
