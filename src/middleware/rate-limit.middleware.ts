import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requestQueue: { timestamp: number }[] = [];
  private readonly REQUEST_LIMIT = 5;
  private readonly WINDOW_SIZE = 60000; // 1 minute in milliseconds

  async use(req: Request, res: Response, next: NextFunction) {
    const now = Date.now();
    // Remove requests older than 1 minute from request queue
    this.requestQueue = this.requestQueue.filter(
      (entry) => entry.timestamp + this.WINDOW_SIZE > now,
    );

    if (this.requestQueue.length >= this.REQUEST_LIMIT) {
      const timeRemaining = this.requestQueue[0].timestamp + this.WINDOW_SIZE - now;
      await new Promise((resolve) => setTimeout(resolve, timeRemaining));
    }

    // Add current request to the queue
    this.requestQueue.push({ timestamp: now });
    next();
  }
}
