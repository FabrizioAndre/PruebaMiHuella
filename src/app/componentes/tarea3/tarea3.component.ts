import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController, Platform } from "@ionic/angular";

@Component({
  selector: "app-tarea3",
  templateUrl: "./tarea3.component.html",
  styleUrls: ["./tarea3.component.scss"],
})
export class Tarea3Component implements OnInit {
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
