import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { WhoisService } from './whois.service';
import { WhoisRequestDto } from './dto/whois-request.dto';

@Controller('whois')
export class WhoisController {
  constructor(private readonly whoisService: WhoisService) {}

  @Get(':type/:domain')
  async getWhoisInfo(
    @Param('type') type: 'domain-info' | 'contact-info',
    @Param('domain') domain: string,
  ) {
    const request: WhoisRequestDto = { domain, type };
    return this.whoisService.getWhoisInfo(request);
  }
}
