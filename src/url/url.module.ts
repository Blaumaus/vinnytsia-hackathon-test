import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Url } from './entities/url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [UrlService],
  exports: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
