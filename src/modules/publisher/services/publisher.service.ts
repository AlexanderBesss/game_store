import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Publisher } from '../../../shared/entities/publisher.entity';

@Injectable()
export class PublisherService {
  constructor(@InjectRepository(Publisher) private readonly publisherRepository: Repository<Publisher>) {}

  async findById(id: number): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne(id);
    if (!publisher) {
      throw new NotFoundException('Publisher not found.');
    }
    return publisher;
  }
}
