import { Module } from '@nestjs/common';
import { CdpGenerateTokenController } from './cdp-generate-token.controller';
import { CdpGenerateTokenService } from './cdp-generate-token.service';

@Module({
  controllers: [CdpGenerateTokenController],
  providers: [CdpGenerateTokenService],
})
export class CdpModule {}
