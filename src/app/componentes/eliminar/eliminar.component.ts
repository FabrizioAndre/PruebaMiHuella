import { Component } from "@angular/core";

declare var cordova: any;
@Component({
  selector: "app-eliminar",
  templateUrl: "./eliminar.component.html",
  styleUrls: ["./eliminar.component.scss"],
})
export class EliminarComponent {
  fileName: string;

  constructor() {}
}
