import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SharedDataService } from "src/app/services/shared-data.service";
import { AlertService } from "src/app/services/alert.service";
import { Platform } from "@ionic/angular";
import {
  AlertController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.scss"],
})
export class InicioComponent implements OnInit {
  private lastTimeBackButtonWasPressed = 0;
  private timePeriodToAction = 2000;

  hCarbono = false;
  hHidrica = false;
  hEcologica = false;
  alertController: any;

  constructor(
    private network: Network,
    private platform: Platform,
    private toastController: ToastController,
    private navControlelr: NavController,
    private router: Router,
    private sharedData: SharedDataService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    if (this.network.type === "none") {
      this.openAlert();
    }

    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/") {
        this.withDoublePress("Presiona nuevamente para salir", () => {
          navigator["app"].exitApp();
        });
      }
    });

    this.sharedData.sethCarbonoValue(false);
    this.sharedData.sethHidricaValue(false);
  }
  async openAlert() {
    const alert = await this.alertController.create({
      header: "No tienes internet",
      message: "Revisa tu estado de red",
      backdropDismiss: false,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.router.navigate(["/"]);
          },
        },
      ],
    });
    await alert.present();

    /* INTERNET */
  }

  goStartHC() {
    this.sharedData.sethCarbonoValue(true);
    this.router.navigate(["/general"]);
  }

  goStartHH() {
    this.sharedData.sethHidricaValue(true);
    this.router.navigate(["/general"]);
  }

  goStart() {
    this.sharedData.sethCarbonoValue(true);
    this.sharedData.sethHidricaValue(true);

    this.router.navigate(["/general"]);
  }

  fnSethCarbono() {
    this.sharedData.sethCarbonoValue(this.hCarbono);
  }

  fnSethHidrica() {
    this.sharedData.sethHidricaValue(this.hHidrica);
    if (!this.hHidrica) this.sharedData.setTieneVehiculoValue(null);
  }

  fnSethEcologica() {
    this.sharedData.sethEcologicaValue(this.hEcologica);
  }

  async withDoublePress(message: string, action: () => void) {
    const currentTime = new Date().getTime();

    if (
      currentTime - this.lastTimeBackButtonWasPressed <
      this.timePeriodToAction
    ) {
      action();
    } else {
      const toast = await this.toastController.create({
        message: message,
        duration: this.timePeriodToAction,
      });

      await toast.present();

      this.lastTimeBackButtonWasPressed = currentTime;
    }
  }
}
