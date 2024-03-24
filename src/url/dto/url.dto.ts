import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateUrlDTO {
  @ApiProperty({
    example: 'https://example.com/your-long-path',
    required: true,
  })
  @IsUrl()
  fullUrl: string;
}
