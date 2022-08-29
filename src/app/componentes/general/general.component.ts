import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
import { HttpErrorResponse } from "@angular/common/http";
import { SharedDataService } from "src/app/services/shared-data.service";
import { NgForm } from "@angular/forms";
import { AlertService } from "src/app/services/alert.service";
import {
  AlertController,
  NavController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.scss"],
})
export class GeneralComponent implements OnInit {
  general: any = {};
  hCarbono = false;
  hHidrica = false;
  hEcologica = false;
  type = false;
  lstDepartamento: any[];
  lstProvincia: any[];
  lstDistrito: any[];
  lstTipoVivienda: any[];
  lstMaterialVivienda: any[];

  constructor(
    private alertController: AlertController,
    private network: Network,
    private platform: Platform,
    private router: Router,
    private adminService: AdminService,
    private sharedData: SharedDataService,
    private alertService: AlertService,
    private navControlelr: NavController
  ) {
    this.general.departamento = "00";
    this.fnDepartamento();
  }

  ngOnInit() {
    if (this.network.type === "none") {
      this.openAlert();
    }

    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/general") {
        this.router.navigate(["/"]);
      } else {
        this.navControlelr.back();
      }
    });

    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;
    this.hEcologica = this.sharedData.hEcologicaValue;

    if (this.hEcologica) {
      this.fnTipoVivienda();
      this.fnMaterialVivienda();
    }
    if (this.sharedData.personaValue != null) {
      this.general = this.sharedData.personaValue;
      if (this.general != null) {
        this.adminService.listarProvincia(this.general.departamento).subscribe(
          (data) => {
            if (data.exito) {
              this.lstProvincia = data.datosAdicionales;
            }
          },
          (error: HttpErrorResponse) => {
            console.error(error.message);
          }
        );
        this.adminService
          .listarDistrito(this.general.departamento, this.general.provincia)
          .subscribe(
            (data) => {
              if (data.exito) {
                this.lstDistrito = data.datosAdicionales;
              }
            },
            (error: HttpErrorResponse) => {
              console.error(error.message);
            }
          );
      }
    }
  }

  fnDepartamento() {
    this.adminService.listarDepartamento().subscribe(
      (data) => {
        // console.log(data);
        if (data.exito) {
          this.lstDepartamento = data.datosAdicionales;
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  fnProvincia() {
    this.adminService.listarProvincia(this.general.departamento).subscribe(
      (data) => {
        // console.log(data);
        if (data.exito) {
          this.lstProvincia = data.datosAdicionales;
          this.general.provincia = "00";
          this.lstDistrito = [];
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  fnDistrito() {
    this.adminService
      .listarDistrito(this.general.departamento, this.general.provincia)
      .subscribe(
        (data) => {
          if (data.exito) {
            this.lstDistrito = data.datosAdicionales;
            this.general.distrito = "00";
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
        }
      );
  }

  fnTipoVivienda() {
    this.adminService.listarParamByTipo("TIPO_VIVIENDA").subscribe(
      (data) => {
        console.log(data);
        if (data.exito) {
          this.lstTipoVivienda = data.datosAdicionales;
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  fnMaterialVivienda() {
    this.adminService.listarParamByTipo("MATERIAL_VIVIENDA").subscribe(
      (data) => {
        if (data.exito) {
          this.lstMaterialVivienda = data.datosAdicionales;
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  irSiguiente(form: NgForm) {
    if (form.invalid) {
      this.alertService.error("Complete los campos obligatorios");
      return;
    }
    this.general.hCarbono = this.sharedData.hCarbonoValue;
    this.general.hHidrica = this.sharedData.hHidricaValue;
    this.general.hEcologica = this.sharedData.hEcologicaValue;

    this.sharedData.setPersona(this.general);
    this.router.navigate(["/energia"]);
  }

  irAnterior() {
    this.sharedData.setPersona(this.general);
    this.router.navigate(["tabs/iniciop"]);
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
  }
  async openAlert2() {
    const alert = await this.alertController.create({
      header: "Tienes internet",
      message: "No tienes internete",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            navigator["app"].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }
}
