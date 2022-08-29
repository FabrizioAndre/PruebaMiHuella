import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { Network } from "@ionic-native/network/ngx";
import { IonRouterOutlet, Platform } from "@ionic/angular";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { CargarScriptsService } from "./cargar-scripts.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GeneralComponent } from "./componentes/general/general.component";
import { EnergiaComponent } from "./componentes/energia/energia.component";
import { PublicoComponent } from "./componentes/publico/publico.component";
import { InterprovincialComponent } from "./componentes/interprovincial/interprovincial.component";
import { AereoComponent } from "./componentes/aereo/aereo.component";
import { ResiduosComponent } from "./componentes/residuos/residuos.component";
import { LavamanosComponent } from "./componentes/lavamanos/lavamanos.component";
import { VehicPropioComponent } from "./componentes/vehic-propio/vehic-propio.component";
import { JardinComponent } from "./componentes/jardin/jardin.component";
import { RopaComponent } from "./componentes/ropa/ropa.component";
import { DesayunoComponent } from "./componentes/desayuno/desayuno.component";
import { HttpClientModule } from "@angular/common/http";
import { AlertComponent } from "./componentes/_util/alert/alert.component";
import { HcarbonoComponent } from "./componentes/hcarbono/hcarbono.component";
import { HhidricaComponent } from "./componentes/hhidrica/hhidrica.component";
import { ResultadoComponent } from "./componentes/resultado/resultado.component";
import { IonicModule } from "@ionic/angular";
import { NuevotabComponent } from "./componentes/nuevotab/nuevotab.component";
import { InicioComponent } from "./componentes/inicio/inicio.component";
import { AnalisisComponent } from "./componentes/analisis/analisis.component";
import { AlwaComponent } from "./componentes/alwa/alwa.component";
import { Nuevotab4Component } from "./componentes/nuevotab4/nuevotab4.component";
import { EliminarComponent } from "./componentes/eliminar/eliminar.component";
import { VehicpropioHCComponent } from "./componentes/vehicpropio-hc/vehicpropio-hc.component";
import { ServicioHCComponent } from "./componentes/servicio-hc/servicio-hc.component";
import { Tarea1Component } from "./componentes/tarea1/tarea1component";
import { Tarea2Component } from "./componentes/tarea2/tarea2.component";
import { Tarea3Component } from "./componentes/tarea3/tarea3.component";

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    EnergiaComponent,
    PublicoComponent,
    InterprovincialComponent,
    AereoComponent,
    ResiduosComponent,
    LavamanosComponent,
    VehicPropioComponent,
    JardinComponent,
    RopaComponent,
    DesayunoComponent,
    AlertComponent,
    HcarbonoComponent,
    HhidricaComponent,
    ResultadoComponent,
    NuevotabComponent,
    InicioComponent,
    AnalisisComponent,
    AlwaComponent,
    Tarea1Component,
    Tarea2Component,
    Tarea3Component,
    Nuevotab4Component,
    EliminarComponent,
    VehicpropioHCComponent,
    ServicioHCComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot({
      rippleEffect: false,
      /*       mode: 'md' */
    }),
  ],
  providers: [
    Network,
    CargarScriptsService,
    IonRouterOutlet,
    MobileAccessibility,
    SocialSharing,
    Platform,
  ],
  bootstrap: [AppComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
