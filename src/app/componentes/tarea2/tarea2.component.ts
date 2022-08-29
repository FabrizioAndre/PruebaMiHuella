import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController, Platform } from "@ionic/angular";

@Component({
  selector: "app-tarea2",
  templateUrl: "./tarea2.component.html",
  styleUrls: ["./tarea2.component.scss"],
})
export class Tarea2Component implements OnInit {
  constructor(
    private platform: Platform,
    private router: Router,
    private navControlelr: NavController
  ) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      this.router.navigate(["/"]);
    });
  }
}
