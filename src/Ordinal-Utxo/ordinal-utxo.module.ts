import { Module } from '@nestjs/common';
import { OrdinalUtxoController } from './ordinal-utxo.controller';
import { OrdinalUtxoService } from './ordinal-utxo.service';

@Module({
  controllers: [OrdinalUtxoController],
  providers: [OrdinalUtxoService],
})
export class OrdinalUtxoModule {}
