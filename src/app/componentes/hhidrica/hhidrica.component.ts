import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/services/shared-data.service";
import { RestdataService } from "src/app/services/restdata.service";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import * as Chart from "chart.js";
import * as htmlToImage from "html-to-image";

@Component({
  selector: "app-hhidrica",
  templateUrl: "./hhidrica.component.html",
  styleUrls: ["./hhidrica.component.scss"],
})
export class HhidricaComponent implements OnInit {
  totalAgua: Number = 0;
  fileName: String = "";
  resultadoHH: any = {};
  persona: any;
  view = true;

  constructor(
    private socialSharing: SocialSharing,
    private sharedData: SharedDataService,
    private restData: RestdataService
  ) {}

  ngOnInit() {
    this.totalAgua = this.sharedData.totalAguaValue;

    let filtro = { idPersona: this.sharedData.IDPersonaHHValue };

    this.restData.resultadoHH(filtro).subscribe((data) => {
      if (data.exito) {
        console.log(JSON.stringify(data));

        this.resultadoHH = data.datosAdicionales;

        console.log(this.resultadoHH.hhAzul);
        console.log(this.resultadoHH.hhVerde);
        console.log(this.resultadoHH.hhIndirecta);
        console.log(this.resultadoHH.hhGris);

        var myChart = new Chart("myChartHH", {
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
              "Huella Azul",
              "Huella Verde",
              "Huella Gris",
              "Huella Indirecta",
            ],

            datasets: [
              {
                label: "# of Votes",

                data: [
                  this.resultadoHH.hhAzul,
                  this.resultadoHH.hhVerde,
                  this.resultadoHH.hhGris,
                  this.resultadoHH.hhIndirecta,
                ],
                hoverBackgroundColor: [
                  "#87E0FF",
                  "#9DED77",
                  "#4F4F4F",
                  "#FFB835 ",
                ],

                backgroundColor: ["#87E0FF", "#9DED77", "#4F4F4F", "#FFB835 "],
                borderColor: ["#87E0FF", "#9DED77", "#4F4F4F", "#FFB835 "],
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
          "Hola esta es mi Huella Hidrica, visita https://alwa.pe/ para más información",
          null,
          dataUrl
        );
      });
  }
}
