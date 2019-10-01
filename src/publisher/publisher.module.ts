import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublisherService } from './services/publisher.service';
import { Publisher } from '../shared/entities/publisher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublisherService],
  exports: [PublisherService],
})
export class PublisherModule {}
