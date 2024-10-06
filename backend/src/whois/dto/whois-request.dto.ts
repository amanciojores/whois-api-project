import { IsString, IsEnum } from 'class-validator';

export class WhoisRequestDto {
  @IsString()
  domain: string;

  @IsEnum(['domain-info', 'contact-info'])
  type: 'domain-info' | 'contact-info';
}
