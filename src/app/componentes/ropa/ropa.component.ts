import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AlertService } from "src/app/services/alert.service";
import { SharedDataService } from "src/app/services/shared-data.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-ropa",
  templateUrl: "./ropa.component.html",
  styleUrls: ["./ropa.component.scss"],
})
export class RopaComponent implements OnInit {
  hHidrica = false;
  hCarbono = false;

  consumoAgua: any = {};
  constructor(
    private router: Router,
    private alertService: AlertService,
    private sharedData: SharedDataService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/ropa") {
        this.router.navigate(["/jardin"]);
      }
    });

    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;
    this.consumoAgua =
      this.sharedData.ropaValue != null ? this.sharedData.ropaValue : {};

    /*    if (this.sharedData.ropaValue == null) {
   
         this.consumoAgua.vecesLava = 0;
         this.consumoAgua.vecesLlena = 0;
         this.consumoAgua.tiempo = 0;
         this.consumoAgua.vecesLavadora = 0;
         this.consumoAgua.capacidad = 0;
         this.consumoAgua.cantidad = 0;
       } */

    this.consumoAgua.vecesLava = 0;
    this.consumoAgua.vecesLlena = 0;
    this.consumoAgua.tiempo = 0;
    this.consumoAgua.vecesLavadora = 0;
    this.consumoAgua.capacidad = 0;
    this.consumoAgua.cantidad = 0;
  }

  irSiguiente(form: NgForm) {
    if (form.invalid) {
      this.alertService.error("Complete los campos obligatorios");
      return;
    }

    this.sharedData.setRopa(this.consumoAgua);
    this.router.navigate(["/desayuno"]);
  }

  irAnterior() {
    this.sharedData.setRopa(this.consumoAgua);
    this.router.navigate(["/jardin"]);
  }

  Aumentar1() {
    this.consumoAgua.vecesLava++;
  }

  Disminuir1() {
    if (this.consumoAgua.vecesLava > 0) {
      this.consumoAgua.vecesLava--;
    }
  }

  Aumentar2() {
    this.consumoAgua.vecesLlena++;
  }

  Disminuir2() {
    if (this.consumoAgua.vecesLlena > 0) {
      this.consumoAgua.vecesLlena--;
    }
  }

  Aumentar3() {
    this.consumoAgua.tiempo++;
  }

  Disminuir3() {
    if (this.consumoAgua.tiempo > 0) {
      this.consumoAgua.tiempo--;
    }
  }

  Aumentar4() {
    this.consumoAgua.vecesLavadora++;
  }

  Disminuir4() {
    if (this.consumoAgua.vecesLavadora > 0) {
      this.consumoAgua.vecesLavadora--;
    }
  }

  Aumentar5() {
    this.consumoAgua.capacidad++;
  }

  Disminuir5() {
    if (this.consumoAgua.capacidad > 0) {
      this.consumoAgua.capacidad--;
    }
  }

  Aumentar6() {
    this.consumoAgua.cantidad++;
  }

  Disminuir6() {
    if (this.consumoAgua.cantidad > 0) {
      this.consumoAgua.cantidad--;
    }
  }
}
