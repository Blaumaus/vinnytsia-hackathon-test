import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UrlService } from './url.service';
import { CreateUrlDTO } from './dto/url.dto';
import { RedirectDto } from './dto/redirect.dto';
import { GetHitsDto } from './dto/get-hits.dto';

@ApiTags('Url')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':id')
  async redirect(
    @Res() res: Response,
    @Param() params: RedirectDto,
  ): Promise<any> {
    const { id } = params;

    const url = await this.urlService.findOne(id);

    if (!url) {
      throw new NotFoundException('URL with the given ID does not exist');
    }

    this.urlService.update(id, {
      hits: 1 + url.hits,
    });

    return res.redirect(url.longUrl);
  }

  @Get('hits/:id')
  async getHits(@Param() params: GetHitsDto): Promise<any> {
    const { id } = params;

    const url = await this.urlService.findOne(id);

    if (!url) {
      throw new NotFoundException('URL with the given ID does not exist');
    }

    return {
      hits: url.hits,
    };
  }

  @Post('create')
  async createUrl(@Body() body: CreateUrlDTO): Promise<any> {
    return this.urlService.createShortenUrl(body.fullUrl);
  }
}
