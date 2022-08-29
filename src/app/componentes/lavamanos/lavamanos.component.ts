import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AlertService } from "src/app/services/alert.service";
import { SharedDataService } from "src/app/services/shared-data.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-lavamanos",
  templateUrl: "./lavamanos.component.html",
  styleUrls: ["./lavamanos.component.scss"],
})
export class LavamanosComponent implements OnInit {
  hHidrica = false;
  hCarbono = false;
  habitos: any = {};

  constructor(
    private router: Router,
    private platform: Platform,
    private alertService: AlertService,
    private sharedData: SharedDataService
  ) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/habitos") {
        this.router.navigate(["/energia"]);
      }
    });

    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;

    this.habitos =
      this.sharedData.habitosValue != null ? this.sharedData.habitosValue : {};

    console.log("Aquí   " + JSON.stringify(this.sharedData.habitosValue));

    if (this.sharedData.habitosValue == null) {
      this.habitos.vecesLavaManos = 0;
      this.habitos.vecesLavaDientes = 0;
      this.habitos.vecesUsaInodoro = 0;
      this.habitos.tiempoCepilla = 0;
      this.habitos.tiempoDucha = 0;
      this.habitos.vecesUsaDucha = 0;
      this.habitos.capInodoro = 0;
    }
  }

  irSiguiente(form: NgForm) {
    if (form.invalid) {
      this.alertService.error("Complete los campos obligatorios");
      return;
    }
    this.habitos.cierraLavamanos =
      this.habitos.cierraLavamanos == true ? true : false;
    console.log("cierraLM:" + this.habitos.cierraLavamanos);
    this.habitos.cierraLlaveCepillarse =
      this.habitos.cierraLlaveCepillarse == true ? true : false;
    this.habitos.conoceCapacidad =
      this.habitos.conoceCapacidad == true ? true : false;
    this.habitos.cierreLlaveDucha =
      this.habitos.cierreLlaveDucha == true ? true : false;
    console.log(this.habitos);

    this.sharedData.setHabitos(this.habitos);
    this.router.navigate(["/vehicPropio"]);
  }

  irAnterior() {
    this.sharedData.setHabitos(this.habitos);
    this.router.navigate(["/energia"]);
  }

  Aumentar1() {
    this.habitos.vecesLavaManos++;
  }

  Disminuir1() {
    if (this.habitos.vecesLavaManos > 0) {
      this.habitos.vecesLavaManos--;
    }
  }

  Aumentar2() {
    this.habitos.vecesLavaDientes++;
  }

  Disminuir2() {
    if (this.habitos.vecesLavaDientes > 0) {
      this.habitos.vecesLavaDientes--;
    }
  }

  Aumentar3() {
    this.habitos.tiempoCepilla++;
  }

  Disminuir3() {
    if (this.habitos.tiempoCepilla > 0) {
      this.habitos.tiempoCepilla--;
    }
  }

  Aumentar4() {
    this.habitos.vecesUsaInodoro++;
  }

  Disminuir4() {
    if (this.habitos.vecesUsaInodoro > 0) {
      this.habitos.vecesUsaInodoro--;
    }
  }

  Aumentar5() {
    this.habitos.vecesUsaDucha++;
  }

  Disminuir5() {
    if (this.habitos.vecesUsaDucha > 0) {
      this.habitos.vecesUsaDucha--;
    }
  }

  Aumentar6() {
    this.habitos.tiempoDucha++;
  }

  Disminuir6() {
    if (this.habitos.tiempoDucha > 0) {
      this.habitos.tiempoDucha--;
    }
  }

  Aumentar7() {
    this.habitos.capInodoro++;
  }

  Disminuir7() {
    if (this.habitos.capInodoro > 0) {
      this.habitos.capInodoro--;
    }
  }
}
