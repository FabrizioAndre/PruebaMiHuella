import { Component, OnInit, PlatformRef } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
import { FormBuilder, Validators, NgForm } from "@angular/forms";
import { SharedDataService } from "src/app/services/shared-data.service";
import { RestdataService } from "src/app/services/restdata.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-interprovincial",
  templateUrl: "./interprovincial.component.html",
  styleUrls: ["./interprovincial.component.css"],
})
export class InterprovincialComponent implements OnInit {
  interprov: any = {};
  hHidrica = false;
  hCarbono = false;

  lstTipoTransporte: any[];
  lstViaje: any[] = [];
  noUsoTransporte: Number;

  //Paginacion
  page = 1;
  pageSize = 2;
  total = 0;

  loading = false;
  submit = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private sharedData: SharedDataService,
    public fb: FormBuilder,
    private platform: Platform
  ) {
    this.fnTipoTransporte();
  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/interprov") {
        this.router.navigate(["/vehicpropioHC"]);
      }
    });

    this.interprov.tipoConsumo = 1;

    this.interprov.veces = 0;
    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;
    this.lstViaje =
      this.sharedData.lstInterprov != undefined
        ? this.sharedData.lstInterprov
        : [];
    console.log(
      "noUsoTransporte nPersona: " +
      JSON.stringify(this.sharedData.personaValue)
    );
    this.noUsoTransporte = this.sharedData.personaValue.noTransporte;
    console.log("this.noUsoTransporte 2 :" + this.noUsoTransporte);
    if (this.sharedData.lstInterprov != null)
      this.total =
        this.sharedData.lstInterprov.length > 0 ? this.lstViaje.length : 0;
  }

  fnTipoTransporte() {
    this.adminService
      .listarParamByTipo("TIPO_TRANSP_INTERPROV")
      .subscribe((data) => {
        if (data.exito) {
          this.lstTipoTransporte = data.datosAdicionales;
        }
      });
  }

  addItem(form: NgForm) {
    this.submit = true;

    if (form.invalid) {
      return;
    }
    this.loading = true;
    this.lstViaje.push(this.interprov);
    this.total = this.lstViaje.length;

    this.interprov = {};
    this.loading = false;
    this.submit = false;

    this.interprov.veces = 0;
    this.interprov.tipoConsumo = 1;
  }

  irSiguiente() {
    this.loading = true;
    if (this.lstViaje.length > 0) this.sharedData.setInterprov(this.lstViaje);
    if (this.sharedData.hCarbonoValue) this.router.navigate(["/aereo"]);
  }

  irAnterior() {
    if (this.lstViaje.length > 0) this.sharedData.setInterprov(this.lstViaje);

    console.log("this.noUsoTransporte:" + this.noUsoTransporte);
    if (this.noUsoTransporte == 1) this.router.navigate(["vehicpropioHC"]);
    else this.router.navigate(["publico"]);
  }

  Aumentar() {
    this.interprov.veces++;
  }

  Disminuir() {
    if (this.interprov.veces > 0) {
      this.interprov.veces--;
    }
  }

  searchValue: string = "";
  clearSearch() {
    this.interprov.valorConsumo = null;
  }
}
