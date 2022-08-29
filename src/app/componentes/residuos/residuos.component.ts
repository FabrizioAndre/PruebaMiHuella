import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AlertService } from "src/app/services/alert.service";
import { AdminService } from "src/app/services/admin.service";
import { SharedDataService } from "src/app/services/shared-data.service";
import { Router } from "@angular/router";
import { RestdataService } from "src/app/services/restdata.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-residuos",
  templateUrl: "./residuos.component.html",
  styleUrls: ["./residuos.component.scss"],
})
export class ResiduosComponent implements OnInit {
  hHidrica = false;
  hCarbono = false;

  residuos: any = {};
  lstResiduos: any[] = [];
  loading = false;
  totalEmisiones: Number;
  fileNameHC: String;
  fileNameHH: String;
  totalAgua: Number;
  idPersona: Number;

  constructor(
    private alertService: AlertService,
    private adminService: AdminService,
    private sharedData: SharedDataService,
    private router: Router,
    private restdata: RestdataService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/residuos") {
        this.router.navigate(["/aereo"]);
      }
    });

    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;
    console.log(this.sharedData.residuosValue);
    this.residuos =
      this.sharedData.residuosValue != null
        ? this.sharedData.residuosValue
        : {};
    this.lstResiduos =
      this.sharedData.residuosValue != null
        ? this.sharedData.residuosValue.lstComposicion
        : this.fnTipoResiduo();
  }

  irFinalizar(form: NgForm) {
    if (form.invalid) {
      this.alertService.error("Complete los campos obligatorios");
      return;
    }

    if (
      this.residuos.composicion == "si" &&
      this.fnGetTotalComposicion() == 0
    ) {
      this.alertService.warning("Complete los datos de composición");
      return;
    }

    this.loading = true;
    this.residuos.lstComposicion = this.lstResiduos;
    this.residuos.indComposicion = this.residuos.composicion == "si" ? 1 : 0;
    this.sharedData.setResiduos(this.residuos);

    //TODO: Registrar datos
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
      LstAereo: this.sharedData.lstAereo,
      Residuo: this.sharedData.residuosValue,
      LstComposicion: this.sharedData.residuosValue.lstComposicion,
      ConsumoAgua: this.sharedData.ropaValue,
      HabitosAgua: this.sharedData.habitosValue,
    };
    console.log(jsonData);
    this.restdata.registrar(jsonData).subscribe((data) => {
      console.log(data);

      if (data.exito) {
        let resultado = <String>data.datoAdicional;
        let resultArray = resultado.split(":::");

        if (this.hCarbono && this.hHidrica) {
          this.totalEmisiones = +resultArray[0];

          this.fileNameHC = resultArray[1];

          this.sharedData.setTotalEmision(this.totalEmisiones);

          this.totalAgua = +resultArray[3];

          this.sharedData.setTotalAgua(this.totalAgua);

          this.idPersona = +resultArray[2];

          this.sharedData.setIDPersonaHC(this.idPersona);
          this.sharedData.setIDPersonaHH(this.idPersona);
        } else {
          this.totalEmisiones = +resultArray[0];

          this.sharedData.setTotalEmision(this.totalEmisiones);

          this.idPersona = +resultArray[2];

          this.sharedData.setIDPersonaHC(this.idPersona);
        }
        this.fnLimpiarSharedData();

        this.router.navigate(["resultado"]);
      }
      this.loading = false;
    });
  }

  irAnterior() {
    this.residuos.lstComposicion = this.lstResiduos;
    this.sharedData.setResiduos(this.residuos);
    this.router.navigate(["/aereo"]);
  }

  fnLimpiarSharedData() {
    // this.sharedData.sethCarbonoValue(null);
    // this.sharedData.sethHidricaValue(null);
    // this.sharedData.sethEcologicaValue(null);

    this.sharedData.setTieneVehiculoValue(null);
    this.sharedData.setPersona(null);
    this.sharedData.setEnergia(null);
    this.sharedData.setHabitos(null);
    this.sharedData.setJardin(null);
    this.sharedData.setRopa(null);
    this.sharedData.setVehicPropio(null);
    this.sharedData.setInterprov(null);
    this.sharedData.setTPublico(null);
    this.sharedData.setDesayuno(null);
    this.sharedData.setAlmuerzo(null);
    this.sharedData.setCena(null);
    this.sharedData.setAereo(null);
    this.sharedData.setBebida(null);
    this.sharedData.setFruta(null);
    this.sharedData.setResiduos(null);
  }

  fnTipoResiduo() {
    this.adminService.listarParamByTipo("TIPO_RESIDUO").subscribe((data) => {
      console.log(data);
      if (data.exito) {
        this.lstResiduos = data.datosAdicionales;
      }
    });
  }

  fnGetTotalComposicion() {
    let total = 0;
    this.lstResiduos.forEach((item) => {
      if (item.porcentaje) total = +total + +item.porcentaje;
    });
    return total;
  }
}
