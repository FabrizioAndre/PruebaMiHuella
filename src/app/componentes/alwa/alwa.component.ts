import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { NavController, Platform} from "@ionic/angular";

@Component({
  selector: "app-alwa",
  templateUrl: "./alwa.component.html",
  styleUrls: ["./alwa.component.scss"],
})
export class AlwaComponent implements OnInit {
  @ViewChild("captures") myCanvas: ElementRef;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      this.router.navigate(["/"]);
    });
  }
}
