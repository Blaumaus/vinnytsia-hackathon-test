import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customAlphabet } from 'nanoid';

import { Url } from './entities/url.entity';

// A list of characters that can be used in a Project ID
const LEGAL_SHORT_URL_CHARACTERS =
  '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
const generateUrlId = customAlphabet(LEGAL_SHORT_URL_CHARACTERS, 10);

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  async create(dto: Partial<Url>): Promise<Url> {
    return this.urlRepository.save(dto);
  }

  async update(id: string, update: Record<string, unknown>): Promise<any> {
    return this.urlRepository.update({ id }, update);
  }

  async delete(id: string): Promise<any> {
    return this.urlRepository.delete(id);
  }

  findOneWhere(
    where: Record<string, unknown>,
    relations?: string[],
    select?: any,
  ): Promise<Url> {
    return this.urlRepository.findOne({ where, relations, select });
  }

  findOne(id: string, params: any = {}): Promise<Url> {
    return this.urlRepository.findOne({
      where: { id },
      ...params,
    });
  }

  find(params: any): Promise<Url[]> {
    return this.urlRepository.find(params);
  }

  async isIDUnique(id: string): Promise<boolean> {
    return !(await this.findOne(id));
  }

  async createShortenUrl(longUrl: string) {
    let id = generateUrlId();

    // eslint-disable-next-line no-await-in-loop
    while (!(await this.isIDUnique(id))) {
      id = generateUrlId();
    }

    return this.create({
      id,
      longUrl,
    });
  }
}
