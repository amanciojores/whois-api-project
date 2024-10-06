import { Module } from '@nestjs/common';
import { WhoisController } from './whois.controller';
import { WhoisService } from './whois.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WhoisController],
  providers: [WhoisService],
})
export class WhoisModule {}
