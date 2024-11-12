import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async getImageUrl(@Query() query: any, @Res() res: Response) {
    try {
      const imageUrl = this.imagesService.generateImageUrl(query);
      return res.status(HttpStatus.OK).json({ imageUrl });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }
}
