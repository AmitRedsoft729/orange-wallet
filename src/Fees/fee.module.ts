import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';

@Module({
  controllers: [FeeController],
  providers: [FeeService],
})
export class FeeModule {}
