import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DomainInfo } from "../Models/domain-info.model";
import { ContactInfo } from "../Models/contact-info.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class WhoisService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDomainInfo(domain: string): Observable<DomainInfo> {
    return this.http.get<DomainInfo>(
      `${this.apiUrl}/whois/domain-info/${domain}`
    );
  }

  getContactInfo(domain: string): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(
      `${this.apiUrl}/whois/contact-info/${domain}`
    );
  }
}
