import { Module } from '@nestjs/common';
import { OrdinalCollectionController } from './ordinals-collections.controller';
import { OrdinalCollectionService } from './ordinals-collections.service';

@Module({
  controllers: [OrdinalCollectionController],
  providers: [OrdinalCollectionService],
})
export class OrdinalCollectionModule {}
