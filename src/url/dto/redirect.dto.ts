import { Matches } from 'class-validator';

export class RedirectDto {
  @Matches(/^(?!.*--)[a-zA-Z0-9-]{10}$/)
  readonly id: string;
}
