import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/services/shared-data.service";
import { RestdataService } from "src/app/services/restdata.service";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

import * as Chart from "chart.js";
/* import { Capacitor, Share } from "@capacitor/core"; */

@Component({
  selector: "app-hcarbono",
  templateUrl: "./hcarbono.component.html",
  styleUrls: ["./hcarbono.component.scss"],
})
export class HcarbonoComponent implements OnInit {
  totalEmisiones: Number = 0;
  fileName: String = "";

  resultadoGEI: any = {};

  persona: any;
  view = true;

  private _alertCtrl: any;

  constructor(
    private socialSharing: SocialSharing,
    private sharedData: SharedDataService,
    private restData: RestdataService
  ) { }

  ngOnInit() {
    this.fileName = this.sharedData.fileNameHCValue;
    this.totalEmisiones = this.sharedData.totalGEIValue;

    if (this.totalEmisiones > 5.44) {
      this.view = false;
    }

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

        var myChart = new Chart("myChartHC", {
          type: "doughnut",
          options: {
            cutoutPercentage: 65,

            legend: {
              display: false,
            },
            tooltips: { enabled: false },
            hover: { mode: null },
          },
          data: {
            labels: [
              "Electricidad",
              "GLP",
              "GN",
              "Carbón",
              "Agua",
              "Alimentos",
              "Vehiculo",
              "Tranposte Público",
              "Taxi",
              "Viajes",
              "Vuelos",
              "Resíduos Solidos",
            ],

            datasets: [
              {
                data: [
                  this.resultadoGEI.electricidad,
                  this.resultadoGEI.glp,
                  this.resultadoGEI.gn,
                  this.resultadoGEI.carbon,
                  this.resultadoGEI.agua,
                  this.resultadoGEI.alimentos,
                  this.resultadoGEI.vehicPropio,
                  this.resultadoGEI.trPublico,
                  this.resultadoGEI.taxi,
                  this.resultadoGEI.trInterprov,
                  this.resultadoGEI.trAereo,
                  this.resultadoGEI.rrss,
                ],

                hoverBackgroundColor: [
                  "#F9EA67" /* Electricidad */,
                  "#B951FF" /* GLP */,
                  "#9DED77" /* GN */,
                  "#342B2B" /* CARBON */,
                  "#87E0FF" /* AGUA */,
                  "#58E176 " /* Alimentos */,
                  "#ED7777 " /* Vehiculo Propio */,

                  "#5D85E8 " /* Tr Publico NO HAY*/,
                  "#ECC334" /* Taxi */,
                  "#032390" /* Tr Interprov NO HAY*/,
                  "#7AB1EB " /* Tr Aereo */,
                  "#E966DC " /* RRSS */,
                ],

                backgroundColor: [
                  "#F9EA67" /* Electricidad */,
                  "#B951FF" /* GLP */,
                  "#9DED77" /* GN */,
                  "#342B2B" /* CARBON */,
                  "#87E0FF" /* AGUA */,
                  "#58E176 " /* Alimentos */,
                  "#ED7777 " /* Vehiculo Propio */,

                  "#5D85E8 " /* Tr Publico NO HAY*/,
                  "#ECC334" /* Taxi */,
                  "#032390" /* Tr Interprov NO HAY*/,
                  "#7AB1EB " /* Tr Aereo */,
                  "#E966DC " /* RRSS */,
                ],
                borderColor: [
                  "#F9EA67" /* Electricidad */,
                  "#B951FF" /* GLP */,
                  "#9DED77" /* GN */,
                  "#342B2B" /* CARBON */,
                  "#87E0FF" /* AGUA */,
                  "#58E176 " /* Alimentos */,
                  "#ED7777 " /* Vehiculo Propio */,

                  "#5D85E8 " /* Tr Publico NO HAY*/,
                  "#ECC334" /* Taxi */,
                  "#032390" /* Tr Interprov NO HAY*/,
                  "#7AB1EB " /* Tr Aereo */,
                  "#E966DC " /* RRSS */,
                ],
                borderWidth: 1,
              },
            ],
          },
        });
      }
    });
  }

  Compartir() {
    let element = document.getElementById("capture");
    let scale = 1;
    htmlToImage
      .toJpeg(element, {
        width: element.clientWidth * scale,
        height: element.clientHeight * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
        },
      })
      .then((dataUrl) => {
        this.socialSharing.share(
          "Hola esta es mi Huella de Carbono 🙂, visita https://alwa.pe/ para más información",
          null,
          dataUrl
        );
      });
  }
}
