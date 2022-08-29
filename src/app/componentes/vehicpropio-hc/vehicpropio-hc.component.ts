import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { SharedDataService } from "src/app/services/shared-data.service";
import { RestdataService } from "src/app/services/restdata.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-vehicpropio-hc",
  templateUrl: "./vehicpropio-hc.component.html",
  styleUrls: ["./vehicpropio-hc.component.scss"],
})
export class VehicpropioHCComponent implements OnInit {
  hHidrica = false;
  hCarbono = false;
  tPublico: any = {};
  vehicPropio: any = {};
  idPersona: Number;
  tieneVehicPropio = true;

  lstTipoCombustible: any[];
  lstTipoTransporte: any[];
  totalAgua: Number;
  fileName: String;

  viewButton = false;
  loading = false;

  fhidrica = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private sharedData: SharedDataService,
    private restdata: RestdataService,
    private platform: Platform
  ) {
    this.fnTipoCombustible();
    this.fnTipoTransporte();
  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/vehicpropioHC") {
        this.router.navigate(["/publico"]);
      }
    });

    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;
    this.tPublico =
      this.sharedData.tPublicoValue != null
        ? this.sharedData.tPublicoValue
        : {};
    this.vehicPropio =
      this.sharedData.vehicPropioValue != null
        ? this.sharedData.vehicPropioValue
        : {};
    this.viewButton =
      this.sharedData.hHidricaValue && !this.sharedData.hCarbonoValue
        ? true
        : false;
    this.fhidrica = this.sharedData.hHidricaValue;
  }

  fnTipoCombustible() {
    this.adminService.listarParamByTipo("TIPO_COMBUSTIBLE").subscribe(
      (data) => {
        if (data.exito) {
          this.lstTipoCombustible = data.datosAdicionales;
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  fnTipoTransporte() {
    this.adminService
      .listarParamByTipo("TIPO_TRANSP_PUBLICO")
      .subscribe((data) => {
        if (data.exito) {
          this.lstTipoTransporte = data.datosAdicionales;
        }
      });
  }

  irSiguiente(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.loading = true;

    console.log("tieneVEhiculo:" + this.vehicPropio.tieneVehiculo);
    this.sharedData.setTPublico(this.tPublico);

    this.sharedData.setVehicPropio(this.vehicPropio);

    if (this.sharedData.hCarbonoValue) this.router.navigate(["/interprov"]);
    else if (this.sharedData.hHidricaValue && !this.sharedData.hCarbonoValue) {
      let consumoAgua = this.sharedData.ropaValue;
      consumoAgua.areaJardin = this.sharedData.jardinValue.area;
      consumoAgua.volumenPiscina = this.sharedData.jardinValue.volumen;
      consumoAgua.vecesLlenaPiscina =
        this.sharedData.jardinValue.vecesLlenaPiscina;
      let jsonData = {
        Persona: this.sharedData.personaValue,
        Energia: this.sharedData.energiaValue,
        Desayuno: this.sharedData.desayunoValue,
        Almuerzo: this.sharedData.almuerzoValue,
        Cena: this.sharedData.cenaValue,
        FrutaBebida: this.sharedData.frutaValue,
        VehicPropio: this.sharedData.vehicPropioValue,
        TPublico: this.sharedData.tPublicoValue,
        LstInterprov: this.sharedData.lstInterprov,
        ConsumoAgua: consumoAgua,
        HabitosAgua: this.sharedData.habitosValue,
      };
      console.log(JSON.stringify(jsonData));
      this.restdata.registrar(jsonData).subscribe((data) => {
        console.log(data);
        if (data.exito) {
          let resultado = <String>data.datoAdicional;
          let resultArray = resultado.split(":::");
          this.totalAgua = +resultArray[0];
          this.fileName = resultArray[1];
          this.sharedData.setTotalAgua(this.totalAgua);
          this.sharedData.setFileNameHH(this.fileName);

          this.idPersona = +resultArray[2];

          this.sharedData.setIDPersonaHH(this.idPersona);

          this.router.navigate(["resultado"]);
        }
        this.loading = false;
      });
    }
  }

  irAnterior() {
    this.sharedData.setTPublico(this.tPublico);
    this.sharedData.setVehicPropio(this.vehicPropio);

    this.router.navigate(["/publico"]);
  }
}
