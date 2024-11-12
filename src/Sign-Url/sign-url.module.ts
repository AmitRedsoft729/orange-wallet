import { Module } from '@nestjs/common';
import { SignUrlService } from './sign-url.service';
import { SignUrlController } from './sign-url.controller';

@Module({
  controllers: [SignUrlController],
  providers: [SignUrlService],
})
export class SignUrlModule {}
