import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { SharedDataService } from "src/app/services/shared-data.service";
import { CargarScriptsService } from "src/app/cargar-scripts.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-desayuno",
  templateUrl: "./desayuno.component.html",
  styleUrls: ["./desayuno.component.scss"],
})
export class DesayunoComponent implements OnInit {
  desayuno: any = {};
  almuerzo: any = {};
  /* nuevo */ bebida: any = {};
  hHidrica = false;
  hCarbono = false;

  constructor(
    private router: Router,
    private sharedData: SharedDataService,
    private _CargaScripts: CargarScriptsService,
    private platform: Platform
  ) {
    _CargaScripts.Carga(["nuevo"]);
  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      if (this.hHidrica) {
        this.router.navigate(["/ropa"]);
      } else {
        this.router.navigate(["/energia"]);
      }
    });

    this.desayuno.cafe = 0;
    this.desayuno.leche = 0;
    this.desayuno.pan = 0;

    this.almuerzo.res = 0;
    this.almuerzo.pollo = 0;
    this.almuerzo.pescado = 0;
    this.almuerzo.cerdo = 0;
    this.almuerzo.arroz = 0;

    this.bebida.cerveza = 0;
    this.bebida.gaseosa = 0;
    this.bebida.vino = 0;
    this.bebida.pisco = 0;

    this.hHidrica = this.sharedData.hHidricaValue;
    this.hCarbono = this.sharedData.hCarbonoValue;

    if (this.sharedData.desayunoValue != null)
      this.desayuno = this.sharedData.desayunoValue;

    if (this.sharedData.almuerzoValue != null)
      this.almuerzo = this.sharedData.almuerzoValue;

    /* nuevo agregado por mi
     */
    if (this.sharedData.bebidaValue != null)
      this.bebida = this.sharedData.bebidaValue;

    /*   NUEVO AGREAGO POR MI this.bebida = this.sharedData.bebidaValue != null ? this.sharedData.bebidaValue : {}; */
  }

  irSiguiente(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.sharedData.setDesayuno(this.desayuno);
    this.sharedData.setAlmuerzo(this.almuerzo);
    this.router.navigate(["/publico"]);
  }

  irAnterior() {
    this.sharedData.setDesayuno(this.desayuno);
    if (this.hHidrica) {
      this.router.navigate(["/ropa"]);
    } else {
      this.router.navigate(["/energia"]);
    }
  }

  Aumentar() {
    if (this.desayuno.leche < 20) {
      this.desayuno.leche++;
    }
  }

  Disminuir() {
    if (this.desayuno.leche > 0) {
      this.desayuno.leche--;
    }
  }
  Aumentar1() {
    if (this.desayuno.pan < 20) {
      this.desayuno.pan++;
    }
  }

  Disminuir1() {
    if (this.desayuno.pan > 0) {
      this.desayuno.pan--;
    }
  }

  Aumentar2() {
    if (this.desayuno.cafe < 20) {
      this.desayuno.cafe++;
    }
  }

  Disminuir2() {
    if (this.desayuno.cafe > 0) {
      this.desayuno.cafe--;
    }
  }

  AumentarRes() {
    if (this.almuerzo.res < 20) {
      this.almuerzo.res++;
    }
  }

  DisminuirRes() {
    if (this.almuerzo.res > 0) {
      this.almuerzo.res--;
    }
  }

  AumentarPo() {
    if (this.almuerzo.pollo < 20) {
      this.almuerzo.pollo++;
    }
  }

  DisminuirPo() {
    if (this.almuerzo.pollo > 0) {
      this.almuerzo.pollo--;
    }
  }

  AumentarPes() {
    if (this.almuerzo.pescado < 20) {
      this.almuerzo.pescado++;
    }
  }

  DisminuirPes() {
    if (this.almuerzo.pescado > 0) {
      this.almuerzo.pescado--;
    }
  }

  AumentarCer() {
    if (this.almuerzo.cerdo < 20) {
      this.almuerzo.cerdo++;
    }
  }

  DisminuirCer() {
    if (this.almuerzo.cerdo > 0) {
      this.almuerzo.cerdo--;
    }
  }

  AumentarAr() {
    if (this.almuerzo.arroz < 20) {
      this.almuerzo.arroz++;
    }
  }

  DisminuirAr() {
    if (this.almuerzo.arroz > 0) {
      this.almuerzo.arroz--;
    }
  }

  AumentarCerv() {
    if (this.bebida.cerveza < 20) {
      this.bebida.cerveza++;
    }
  }

  DisminuirCerv() {
    if (this.bebida.cerveza > 0) {
      this.bebida.cerveza--;
    }
  }

  AumentarGas() {
    if (this.bebida.gaseosa < 20) {
      this.bebida.gaseosa++;
    }
  }

  DisminuirGas() {
    if (this.bebida.gaseosa > 0) {
      this.bebida.gaseosa--;
    }
  }

  AumentarVi() {
    if (this.bebida.vino < 20) {
      this.bebida.vino++;
    }
  }

  DisminuirVi() {
    if (this.bebida.vino > 0) {
      this.bebida.vino--;
    }
  }

  AumentarPi() {
    if (this.bebida.pisco < 20) {
      this.bebida.pisco++;
    }
  }

  DisminuirPi() {
    if (this.bebida.pisco > 0) {
      this.bebida.pisco--;
    }
  }
}
