import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AlertService } from "src/app/services/alert.service";
import { SharedDataService } from "src/app/services/shared-data.service";
import { AdminService } from "src/app/services/admin.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-vehic-propio",
  templateUrl: "./vehic-propio.component.html",
  styleUrls: ["./vehic-propio.component.scss"],
})
export class VehicPropioComponent implements OnInit {
  vehicPropio: any = {};
  hCarbono = false;
  hHidrica = false;
  lstTipoCombustible: any[];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private sharedData: SharedDataService,
    private platform: Platform,
  ) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/vehicPropio") {
        this.router.navigate(["/habitos"]);
      }
    });

    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;
    this.vehicPropio =
      this.sharedData.vehicPropioValue != null
        ? this.sharedData.vehicPropioValue
        : {};

    /*     if (this.sharedData.vehicPropioValue == null) {

          this.vehicPropio.vecesLava = 0;
          this.vehicPropio.tiempoManguera = 0;
          this.vehicPropio.cantBaldes = 0;
          this.vehicPropio.volumenBalde = 0;
        } */

    /* Cambio por mi  */

    this.vehicPropio.vecesLava = 0;
    this.vehicPropio.tiempoManguera = 0;
    this.vehicPropio.cantBaldes = 0;
    this.vehicPropio.volumenBalde = 0;

    /* Cambio por mi  */
  }

  irSiguiente(form: NgForm) {
    if (form.invalid) {
      this.alertService.error("Complete los campos obligatorios");
      return;
    }
    this.sharedData.setTieneVehiculoValue(
      this.vehicPropio.tieneVehiculo == "no" ? false : true
    );
    if (this.vehicPropio.tieneVehiculo == "si")
      this.sharedData.setVehicPropio(this.vehicPropio);

    this.router.navigate(["/jardin"]);
  }

  irAnterior() {
    this.sharedData.setVehicPropio(this.vehicPropio);
    this.router.navigate(["/habitos"]);
  }

  Aumentar() {
    this.vehicPropio.vecesLava++;
  }

  Disminuir() {
    if (this.vehicPropio.vecesLava > 0) {
      this.vehicPropio.vecesLava--;
    }
  }

  Aumentar2() {
    this.vehicPropio.tiempoManguera++;
  }

  Disminuir2() {
    if (this.vehicPropio.tiempoManguera > 0) {
      this.vehicPropio.tiempoManguera--;
    }
  }

  Aumentar3() {
    this.vehicPropio.cantBaldes++;
  }

  Disminuir3() {
    if (this.vehicPropio.cantBaldes > 0) {
      this.vehicPropio.cantBaldes--;
    }
  }

  Aumentar4() {
    this.vehicPropio.volumenBalde++;
  }

  Disminuir4() {
    if (this.vehicPropio.volumenBalde > 0) {
      this.vehicPropio.volumenBalde--;
    }
  }
}
