import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface ApiRequest extends Request {
  isTestnet?: boolean;
}

@Injectable()
export class CheckTestnetMiddleware implements NestMiddleware {
  use(req: ApiRequest, res: Response, next: NextFunction): void {
    req.isTestnet = req.baseUrl.startsWith('/testnet');
    next();
  }
}
