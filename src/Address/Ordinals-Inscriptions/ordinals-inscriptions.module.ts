import { Module } from '@nestjs/common';
import { OrdinalInscriptonController } from './ordinals-inscriptions.controller';
import { OrdinalInscriptionService } from './ordinals-inscriptions.service';
 

@Module({
  controllers: [OrdinalInscriptonController],
  providers: [OrdinalInscriptionService],
})
export class OrdinalInscriptionModule {}
