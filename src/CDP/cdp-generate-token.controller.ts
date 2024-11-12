import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CdpGenerateTokenService } from './cdp-generate-token.service';

@Controller('cdp-generate-token')
export class CdpGenerateTokenController {
  constructor(private readonly cdpGenerateTokenService: CdpGenerateTokenService) {}

  @Post()
  async generateToken(@Body('address') address: string, @Body('blockchain') blockchain: string, @Res() res: Response) {
    // Only allow mainnet for now
    if (process.env.NODE_ENV === 'testnet') {
      return res.status(HttpStatus.FORBIDDEN).json({ error: 'Testnet support is not yet available' });
    }

    try {
      // Validate address here if required
      const token = await this.cdpGenerateTokenService.generateToken(address, blockchain);
      return res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      return res.status(error.getStatus ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        code: error.code,
      });
    }
  }
}
