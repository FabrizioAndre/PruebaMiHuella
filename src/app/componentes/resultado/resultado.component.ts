import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import * as Chart from "chart.js";
import { SharedDataService } from "src/app/services/shared-data.service";

@Component({
  selector: "app-resultado",
  templateUrl: "./resultado.component.html",
  styleUrls: ["./resultado.component.scss"],
})
export class ResultadoComponent implements OnInit {
  hHidrica = false;
  hCarbono = false;

  constructor(
    private sharedData: SharedDataService,
    private platform: Platform,
    private router: Router
  ) {
    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;
  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl === "/resultado") {
        this.router.navigate(["/"]);
      }
    });
  }

  switch_div(show) {
    document.getElementById("show_" + show).style.display = "block";
    document.getElementById("show_" + (show == 1 ? 2 : 1)).style.display =
      "none";
  }
}
