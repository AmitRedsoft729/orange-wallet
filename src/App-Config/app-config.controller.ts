import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppConfigService } from './app-config.service';

@Controller()
export class AppConfigController {
  constructor(private readonly appConfigService: AppConfigService) {}

  @Get('app-config')
  getAppConfig(@Res() res: Response) {
    try {
      const config = this.appConfigService.getConfig();
      return res.json(config);
    } catch (error: any) {
      return res.status(500).json({ message: error.message, code: error.code });
    }
  }
}
