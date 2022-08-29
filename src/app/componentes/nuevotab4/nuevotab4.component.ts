import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SharedDataService } from "src/app/services/shared-data.service";
import { RestdataService } from "src/app/services/restdata.service";
@Component({
  selector: "app-nuevotab4",
  templateUrl: "./nuevotab4.component.html",
  styleUrls: ["./nuevotab4.component.scss"],
})
export class Nuevotab4Component implements OnInit {
  hCarbono = false;
  hHidrica = false;
  hEcologica = false;

  totalAgua: Number = 0;
  fileName: String = "";

  resultadoHH: any = {};
  persona: any;
  view = true;

  constructor(
    private router: Router,
    private sharedData: SharedDataService,
    private restData: RestdataService
  ) {}

  ngOnInit() {
    this.sharedData.sethCarbonoValue(false);
    this.sharedData.sethHidricaValue(false);

    this.totalAgua = this.sharedData.totalAguaValue;
    this.fileName = this.sharedData.fileNameHHValue;

    let filtro = { idPersona: this.sharedData.IDPersonaHHValue };

    this.restData.resultadoHH(filtro).subscribe((data) => {
      if (data.exito) {
        console.log(JSON.stringify(data));

        this.resultadoHH = data.datosAdicionales;

        console.log(this.resultadoHH.hhAzul);
        console.log(this.resultadoHH.hhVerde);
        console.log(this.resultadoHH.hhIndirecta);
        console.log(this.resultadoHH.hhGris);
      }
    });
  }

  goStartHC() {
    this.sharedData.sethCarbonoValue(true);
    this.router.navigate(["/general"]);
  }

  goStartHH() {
    this.sharedData.sethHidricaValue(true);
    this.router.navigate(["/general"]);
  }

  goStart() {
    this.sharedData.sethCarbonoValue(true);
    this.sharedData.sethHidricaValue(true);

    this.router.navigate(["/general"]);
  }

  fnSethCarbono() {
    this.sharedData.sethCarbonoValue(this.hCarbono);
  }

  fnSethHidrica() {
    this.sharedData.sethHidricaValue(this.hHidrica);
    if (!this.hHidrica) this.sharedData.setTieneVehiculoValue(null);
  }

  fnSethEcologica() {
    this.sharedData.sethEcologicaValue(this.hEcologica);
  }
}
