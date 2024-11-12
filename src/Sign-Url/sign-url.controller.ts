import { Controller, Post, Body, Query } from '@nestjs/common';
import { SignUrlService } from './sign-url.service';

@Controller('sign-url')
export class SignUrlController {
  constructor(private readonly signUrlService: SignUrlService) {}

  @Post()
  async signUrl(@Body('url') url: string, @Query('isTestnet') isTestnet: boolean) {
    return this.signUrlService.signUrl(url, isTestnet);
  }
}
