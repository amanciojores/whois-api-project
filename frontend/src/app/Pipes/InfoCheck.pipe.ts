import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "infocheck",
  standalone: true,
})
export class InfoCheck implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value ? value : "No Info Available";
  }
}
