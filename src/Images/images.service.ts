import { Injectable, BadRequestException } from '@nestjs/common';
import { CLOUDFRONT_URL } from '../utils/constants';

const allowedSizes = new Set(['24', '32', '40', '50']);
const allowedTypes = new Set(['png', 'svg']);
const allowedColors = new Set(['babyblue', 'orange']);

@Injectable()
export class ImagesService {
  private isValidToken(token: string): boolean {
    return typeof token === 'string' && /^[a-z]+$/.test(token);
  }

  private validateQueryParams(params: any): { valid: boolean; error?: string } {
    const { token, color, size, imgType } = params;

    if (!this.isValidToken(token)) {
      return { valid: false, error: 'Invalid token, must be only lowercase letters' };
    }
    if (!allowedSizes.has(size)) {
      return { valid: false, error: 'Invalid size, must be one of 24, 32, 40, 50' };
    }
    if (!allowedTypes.has(imgType)) {
      return { valid: false, error: 'Invalid imgType, must be one of png, svg' };
    }
    if (!allowedColors.has(color)) {
      return { valid: false, error: 'Invalid color, must be one of babyblue, orange' };
    }
    return { valid: true };
  }

  generateImageUrl(params: any): string {
    const validation = this.validateQueryParams(params);
    if (!validation.valid) {
      throw new BadRequestException(validation.error);
    }

    const { token, color, size, imgType } = params;
    return `${CLOUDFRONT_URL}/${token}-${color}-${size}px.${imgType}`;
  }
}
