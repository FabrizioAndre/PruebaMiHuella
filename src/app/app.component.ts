import { Component } from '@angular/core';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Componente } from './interfaces/interfaces';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
const { SplashScreen } = Plugins;

declare var name: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  componentes: Observable<Componente[]>;
  title = 'app';
  constructor(
    private router: Router,
    private platform: Platform,
    public alertController: AlertController,
    private network: Network, private mobileAccessibility: MobileAccessibility

  ) {

    this.mobileAccessibility.setTextZoom(100); this.mobileAccessibility.updateTextZoom(); this.mobileAccessibility.usePreferredTextZoom(false);
    this.initializeApp(

    );
    window.addEventListener('offline', () => { this.openAlert(); });

    if (this.network.type === 'none') {
      this.openAlert();
    }


  }
  async openAlert() {
    const alert = await this.alertController.create({
      header: 'No tienes internet',
      message: 'Revisa tu estado de red',
      backdropDismiss: false,
      buttons: [{
        text: "Ok",
        handler: () => {
          navigator['app'].exitApp();
        }
      },
      ]
    });
    await alert.present();
  }


  initializeApp() {
    this.platform.ready().then(async () => {
      setTimeout(() => {
        SplashScreen.hide({
          fadeOutDuration: 100
        });
      }, 2000)
    });
  }

}
