import { Component } from "@angular/core";
import { DomainLookupComponent } from "./Components/domain-lookup/domain-lookpup.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DomainLookupComponent],
  template: "<app-domain-lookup />",
})
export class AppComponent {}
