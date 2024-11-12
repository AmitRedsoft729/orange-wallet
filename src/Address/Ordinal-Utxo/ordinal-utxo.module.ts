import { Module } from '@nestjs/common';
import { OrdinalAddressUtxoController } from './ordinal-utxo.controller';
import { OrdinalAddressUtxoService } from './ordinal-utxo.service';

@Module({
  controllers: [OrdinalAddressUtxoController],
  providers: [OrdinalAddressUtxoService],
})
export class OrdinalAddressUtxoModule {}
