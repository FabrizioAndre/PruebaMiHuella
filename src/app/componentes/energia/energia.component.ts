import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AlertService } from "src/app/services/alert.service";
import { SharedDataService } from "src/app/services/shared-data.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-energia",
  templateUrl: "./energia.component.html",
  styleUrls: ["./energia.component.scss"],
})
export class EnergiaComponent implements OnInit {
  price: any;

  energia: any = {};

  hHidrica = false;
  hCarbono = false;

  constructor(
    private router: Router,
    private platform: Platform,
    private alertService: AlertService,
    private sharedData: SharedDataService
  ) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/energia") {
        this.router.navigate(["/general"]);
      }
    });

    console.log("HC:" + this.sharedData.hCarbonoValue);
    console.log("HH:" + this.sharedData.hHidricaValue);

    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;
    if (this.sharedData.energiaValue != null)
      this.energia = this.sharedData.energiaValue;
  }

  currencyCheck(event): boolean {
    let pattern = /^\d+\.?\d{0,2}$/;
    let result = pattern.test(event.key);
    if (this.energia.valorConsumoEE == null) return result;
    else
      return pattern.test(this.energia.valorConsumoEE.toString() + event.key);
  }

  irSiguiente(form: NgForm) {
    if (form.invalid) {
      this.alertService.error("Complete los campos obligatorios");
      return;
    }
    this.sharedData.setEnergia(this.energia);

    if (this.hHidrica) {
      this.router.navigate(["/habitos"]);
    } else {
      this.router.navigate(["/desayuno"]);
    }
  }

  irAnterior() {
    this.sharedData.setEnergia(this.energia);
    this.router.navigate(["/general"]);
  }
}
