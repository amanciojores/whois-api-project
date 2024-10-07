import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { WhoisRequestDto } from './dto/whois-request.dto';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhoisService {
  private readonly logger = new Logger(WhoisService.name);
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';
    this.apiKey = this.configService.get<string>('WHOIS_API_KEY');
    if (!this.apiKey) {
      this.logger.error(
        'WHOIS_API_KEY is not set in the environment variables',
      );
    }
  }

  async getWhoisInfo(request: WhoisRequestDto) {
    this.logger.log(`Fetching ${request.type} for domain: ${request.domain}`);

    const response$ = this.httpService
      .get(this.apiUrl, {
        params: {
          apiKey: this.apiKey,
          domainName: request.domain,
          outputFormat: 'JSON',
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          this.logger.error(
            `Error fetching Whois data: ${error.message}`,
            error.stack,
          );
          throw new HttpException(
            `Failed to fetch Whois information: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );

    try {
      const whoisData = await firstValueFrom(response$);
      this.logger.log(`Successfully fetched Whois data for ${request.domain}`);

      if (request.type === 'domain-info') {
        return this.formatDomainInfo(whoisData.WhoisRecord);
      } else {
        return this.formatContactInfo(whoisData.WhoisRecord);
      }
    } catch (error) {
      this.logger.error(
        `Error processing Whois data: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        'Error processing Whois data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private formatDomainInfo(whoisRecord: any) {
    return {
      domainName: whoisRecord.domainName,
      registrar: whoisRecord.registrarName,
      registrationDate: whoisRecord.createdDate,
      expirationDate: whoisRecord.expiresDate,
      estimatedDomainAge: this.calculateDomainAge(whoisRecord.createdDate),
      hostnames: this.formatHostnames(whoisRecord.nameServers?.hostNames),
    };
  }

  private formatContactInfo(whoisRecord: any) {
    return {
      registrantName: whoisRecord.registrant.name,
      technicalContactName: whoisRecord.technicalContact.name,
      administrativeContactName: whoisRecord.administrativeContact.name,
      contactEmail: whoisRecord.contactEmail,
    };
  }

  private calculateDomainAge(createdDate: string): string {
    const created = new Date(createdDate);
    const now = new Date();
    const ageInMilliseconds = now.getTime() - created.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return `${Math.floor(ageInYears)} years`;
  }

  private formatHostnames(hostnames: string[]): string {
    if (!hostnames || hostnames.length === 0) return '';
    const formattedHostnames = hostnames.join(', ');
    return formattedHostnames.length > 25
      ? formattedHostnames.substring(0, 25) + '...'
      : formattedHostnames;
  }
}
