import { Component, Input, OnInit } from "@angular/core";
import { templateInfo } from "../../Models/template-info.model";
import { ToDate } from "../../Pipes/ToDate.pipe";
import { DatePipe } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { TableRow } from "../../Models/table-info.model";
import { InfoCheck } from "../../Pipes/InfoCheck.pipe";
@Component({
  standalone: true,
  selector: "info-table",
  imports: [MatTableModule, ToDate, DatePipe, InfoCheck],
  template: `
    @if (infoType === 'domain') {
    <table mat-table [dataSource]="domainDataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="field">
        <th mat-header-cell *matHeaderCellDef>Field</th>
        <td mat-cell *matCellDef="let element">{{ element.field }}</td>
      </ng-container>
      <ng-container matColumnDef="value">
        <th mat-header-cell *matHeaderCellDef>Value</th>
        <td mat-cell *matCellDef="let element">
          {{ element.value | infocheck }}
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
    } @else {
    <table mat-table [dataSource]="contactDataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="field">
        <th mat-header-cell *matHeaderCellDef>Field</th>
        <td mat-cell *matCellDef="let element">{{ element.field }}</td>
      </ng-container>
      <ng-container matColumnDef="value">
        <th mat-header-cell *matHeaderCellDef>Value</th>
        <td mat-cell *matCellDef="let element">
          {{ element.value | infocheck }}
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
    }
  `,
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
})
export class InfoTable implements OnInit {
  @Input({ required: true }) infoType!: string;
  @Input({ required: true }) lookUpInfo!: templateInfo;

  displayedColumns: string[] = ["field", "value"];
  domainDataSource: TableRow[] = [];
  contactDataSource: TableRow[] = [];

  ngOnInit() {
    if (this.infoType === "domain") {
      this.domainDataSource = [
        {
          field: "Domain Name",
          value: this.lookUpInfo.domain?.domainName || "",
        },
        { field: "Registrar", value: this.lookUpInfo.domain?.registrar || "" },
        {
          field: "Registration Date",
          value: this.formatDate(this.lookUpInfo.domain?.registrationDate),
        },
        {
          field: "Expiration Date",
          value: this.formatDate(this.lookUpInfo.domain?.expirationDate),
        },
        {
          field: "Estimated Domain Age",
          value: this.lookUpInfo.domain?.estimatedDomainAge?.toString() || "",
        },
        { field: "Host Names", value: this.lookUpInfo.domain?.hostnames || "" },
      ];
    } else {
      this.contactDataSource = [
        {
          field: "Registrant Name",
          value: this.lookUpInfo.contact?.registrantName || "",
        },
        {
          field: "Technical Contact Name",
          value: this.lookUpInfo.contact?.technicalContactName || "",
        },
        {
          field: "Administrative Contact Name",
          value: this.lookUpInfo.contact?.administrativeContactName || "",
        },
        {
          field: "Contact Email",
          value: this.lookUpInfo.contact?.contactEmail || "",
        },
      ];
    }
  }

  private formatDate(date: any): string {
    return date
      ? new DatePipe("en-US").transform(date, "MMMM dd YYYY") || ""
      : "";
  }
}
