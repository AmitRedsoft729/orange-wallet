import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CoinsController } from './coins.controller';
import { CoinsService } from './coins.service';
import { RateLimitMiddleware } from '../middleware/rate-limit.middleware';

@Module({
  controllers: [CoinsController],
  providers: [CoinsService],
})
export class CoinsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes(CoinsController);
  }
}
