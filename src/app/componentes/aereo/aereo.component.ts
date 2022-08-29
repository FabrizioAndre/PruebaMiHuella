import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AdminService } from "src/app/services/admin.service";
import { SharedDataService } from "src/app/services/shared-data.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-aereo",
  templateUrl: "./aereo.component.html",
  styleUrls: ["./aereo.component.scss"],
})
export class AereoComponent implements OnInit {
  hHidrica = false;
  hCarbono = false;
  hEcologica = false;
  aereo: any = {};

  lstOrigen: any[] = [];
  lstDestino: any[] = [];
  lstViaje: any[] = [];

  submit = false;
  loading = false;

  //Paginacion
  page = 1;
  pageSize = 2;
  total = 0;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private sharedData: SharedDataService,
    private platform: Platform
  ) {
    this.fnOrigen();
  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/aereo") {
        this.router.navigate(["/interprov"]);
      }
    });

    this.aereo.veces = 0;

    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hEcologica = this.sharedData.hEcologicaValue;
    this.hHidrica = this.sharedData.hHidricaValue;
    this.lstViaje =
      this.sharedData.lstAereo != undefined ? this.sharedData.lstAereo : [];
    if (this.sharedData.lstAereo != null)
      this.total =
        this.sharedData.lstAereo.length > 0 ? this.lstViaje.length : 0;
  }

  addItem(form: NgForm) {
    this.submit = true;

    if (form.invalid) {
      return;
    }

    this.loading = true;
    this.aereo.destino.veces = this.aereo.veces;
    this.lstViaje.push(this.aereo.destino);
    this.total = this.lstViaje.length;

    this.aereo = {};
    this.loading = false;
    this.submit = false;

    this.aereo.veces = 0;
  }

  irSiguiente() {
    if (this.lstViaje.length > 0) this.sharedData.setAereo(this.lstViaje);
    this.router.navigate(["/residuos"]);
  }

  irAnterior() {
    if (this.lstViaje.length > 0) this.sharedData.setAereo(this.lstViaje);
    this.router.navigate(["/interprov"]);
  }

  fnOrigen() {
    this.adminService.listarTramoOrigen().subscribe((data) => {
      if (data.exito) {
        this.lstOrigen = data.datosAdicionales;
      }
    });
  }

  fnDestino() {
    this.lstDestino = [];
    this.adminService
      .listarTramoDestino(this.aereo.origen)
      .subscribe((data) => {
        console.log(data);
        if (data.exito) {
          this.lstDestino = data.datosAdicionales;
        }
      });
  }

  Aumentar() {
    this.aereo.veces++;
  }

  Disminuir() {
    if (this.aereo.veces > 0) {
      this.aereo.veces--;
    }
  }
}
