import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { WhoisService } from "../../Services/whois.service";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { LoadingTemplate } from "../info-loading/info-loading.component";
import { InfoTable } from "../info-table/info-table.component";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-domain-lookup",
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    LoadingTemplate,
    InfoTable,
  ],
  template: `
    <div class=" h-dvh w-full flex items-center justify-center flex-col gap-3">
      <div>
        <h1 class=" text-3xl">Website Lookup</h1>
      </div>
      <form (ngSubmit)="onSubmit()" class=" w-2/3">
        <div class="flex flex-col justify-center items-center">
          <div>
            <mat-form-field appearance="fill">
              <mat-label>Enter domain name</mat-label>
              <input matInput [(ngModel)]="domain" name="domain" required />
            </mat-form-field>
          </div>
          <div>
            <mat-form-field appearance="fill">
              <mat-label>Information Type</mat-label>
              <mat-select
                (valueChange)="resetOption()"
                [(ngModel)]="infoType"
                name="infoType"
              >
                <mat-option value="domain">Domain Information</mat-option>
                <mat-option value="contact">Contact Information</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          <button
            type="submit"
            class=" rounded-md bg-sky-800 text-white px-4 py-3"
          >
            Lookup
          </button>
        </div>
      </form>
      <div class=" w-full max-w-4xl mx-auto mt-5">
        @if (error) {
        <div class="error"></div>
        } @else { @if(loaded){
        <info-table
          [infoType]="infoType"
          [lookUpInfo]="{ domain: result, contact: result }"
          class=" w-full mx-5"
        >
        </info-table>
        } @else if(loading) {
        <loading-template />
        } }
      </div>
    </div>
  `,
})
export class DomainLookupComponent {
  domain = "";
  infoType: string = "";
  result: any;
  error: string | null = null;
  loaded: boolean = false;
  loading: boolean = false;
  snackbar: MatSnackBar = inject(MatSnackBar);

  constructor(private whoisService: WhoisService) {}

  resetOption() {
    this.error = null;
    this.loaded = false;
    this.loading = false;
    this.result = null;
  }

  dataSuccess(data: any) {
    this.result = data;
    this.loaded = true;
    this.loading = false;
  }
  dataFailed(err: any) {
    this.resetOption();
    this.snackbar.open("Failed to fetch Domain Information", "Dismiss", {
      duration: 3000,
    });
  }

  onSubmit() {
    this.resetOption();
    if (this.infoType === "domain") {
      this.loading = true;
      this.whoisService.getDomainInfo(this.domain).subscribe({
        next: (data) => this.dataSuccess(data),
        error: (err) => this.dataFailed(err),
      });
    } else {
      this.loading = true;
      this.whoisService.getContactInfo(this.domain).subscribe({
        next: (data) => this.dataSuccess(data),
        error: (err) => this.dataFailed(err),
      });
    }
  }
}
