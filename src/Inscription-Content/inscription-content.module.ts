import { Module } from '@nestjs/common';
import { InscriptionContentController } from './inscription-content.controller';
import { InscriptionContentService } from './inscription-content.service';

@Module({
  controllers: [InscriptionContentController],
  providers: [InscriptionContentService],
})
export class InscriptionContentModule {}
