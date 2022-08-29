import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AlertService } from "src/app/services/alert.service";
import { SharedDataService } from "src/app/services/shared-data.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-jardin",
  templateUrl: "./jardin.component.html",
  styleUrls: ["./jardin.component.scss"],
})
export class JardinComponent implements OnInit {
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

      if (currentUrl === "/jardin") {
        this.router.navigate(["/vehicPropio"]);
      }
    });

    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;
    this.consumoAgua =
      this.sharedData.jardinValue != null ? this.sharedData.jardinValue : {};

    if (this.sharedData.jardinValue == null) {
      this.consumoAgua.area = 0;

      this.consumoAgua.volumen = 0;

      this.consumoAgua.vecesLlenaPiscina = 0;
    }
  }
  irSiguiente(form: NgForm) {
    if (form.invalid) {
      this.alertService.error("Complete los campos obligatorios");
      return;
    }

    this.sharedData.setJardin(this.consumoAgua);
    this.router.navigate(["/ropa"]);
  }

  irAnterior() {
    this.sharedData.setJardin(this.consumoAgua);
    this.router.navigate(["/vehicPropio"]);
  }
  AumentarArea() {
    this.consumoAgua.area++;
  }

  DisminuirArea() {
    if (this.consumoAgua.area > 0) {
      this.consumoAgua.area--;
    }
  }

  AumentarCon() {
    this.consumoAgua.volumen++;
  }

  DisminuirCon() {
    if (this.consumoAgua.volumen > 0) {
      this.consumoAgua.volumen--;
    }
  }

  AumentarConLLe() {
    this.consumoAgua.vecesLlenaPiscina++;
  }

  DisminuirConLLe() {
    if (this.consumoAgua.vecesLlenaPiscina > 0) {
      this.consumoAgua.vecesLlenaPiscina--;
    }
  }
}
