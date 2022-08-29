import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Platform, ToastController } from "@ionic/angular";
import { RestdataService } from "src/app/services/restdata.service";
import { SharedDataService } from "src/app/services/shared-data.service";
@Component({
  selector: "app-analisis",
  templateUrl: "./analisis.component.html",
  styleUrls: ["./analisis.component.scss"],
})
export class AnalisisComponent implements OnInit {
  private lastTimeBackButtonWasPressed = 0;
  private timePeriodToAction = 2000;

  totalEmisiones: Number = 0;
  resultadoGEI: any = {};

  persona: any;
  view = true;

  hCarbono = false;
  hHidrica = false;
  hEcologica = false;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private platform: Platform,
    private sharedData: SharedDataService,
    private restData: RestdataService
  ) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      this.router.navigate(["/"]);
    });

    this.sharedData.sethCarbonoValue(false);
    this.sharedData.sethHidricaValue(false);

    this.totalEmisiones = this.sharedData.totalGEIValue;

    if (this.totalEmisiones > 5.44) {
      this.view = false;
    }

    /*     this.restData.downloadFile("HuellaCarbonoPersonal.pdf", this.fileName); */

    let filtro = { idPersona: this.sharedData.IDPersonaHCValue };

    console.log(filtro);

    this.restData.resultadoGEI(filtro).subscribe((data) => {
      if (data.exito) {
        console.log(JSON.stringify(data));

        this.resultadoGEI = data.datosAdicionales;

        console.log(this.resultadoGEI.electricidad);
        console.log(this.resultadoGEI.glp);
        console.log(this.resultadoGEI.gn);
        console.log(this.resultadoGEI.carbon);
      }
    });
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
