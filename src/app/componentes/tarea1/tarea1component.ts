import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController, Platform } from "@ionic/angular";

@Component({
  selector: "app-tarea1",
  templateUrl: "./tarea1.component.html",
  styleUrls: ["./tarea1.component.scss"],
})
export class Tarea1Component implements OnInit {
  constructor(
    private platform: Platform,
    private router: Router,
  ) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      this.router.navigate(["/"]);
    });
  }
}
