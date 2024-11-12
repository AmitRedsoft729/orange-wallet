import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { InscriptionContentService } from './inscription-content.service';
import { ApiRequest } from '../utils/helpers';

@Controller('content')
export class InscriptionContentController {
  constructor(private readonly inscriptionContentService: InscriptionContentService) {}

  @Get(':inscriptionId')
  async getInscriptionContent(
    @Param('inscriptionId') inscriptionId: string,
    @Req() req: ApiRequest,
    @Res() res: Response,
  ) {
    try {
      const content = await this.inscriptionContentService.fetchInscriptionContent(
        inscriptionId,
        req.isTestnet,
      );
      return res.send(content);
    } catch (error: any) {
      return res
        .status(error.getStatus ? error.getStatus() : 500)
        .json({ message: error.message, code: error.code });
    }
  }
}
