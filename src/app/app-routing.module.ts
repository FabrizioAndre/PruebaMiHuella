import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GeneralComponent } from "./componentes/general/general.component";
import { EnergiaComponent } from "./componentes/energia/energia.component";
import { LavamanosComponent } from "./componentes/lavamanos/lavamanos.component";
import { VehicPropioComponent } from "./componentes/vehic-propio/vehic-propio.component";
import { JardinComponent } from "./componentes/jardin/jardin.component";
import { RopaComponent } from "./componentes/ropa/ropa.component";
import { DesayunoComponent } from "./componentes/desayuno/desayuno.component";
import { PublicoComponent } from "./componentes/publico/publico.component";
import { InterprovincialComponent } from "./componentes/interprovincial/interprovincial.component";
import { AereoComponent } from "./componentes/aereo/aereo.component";
import { ResiduosComponent } from "./componentes/residuos/residuos.component";
import { HcarbonoComponent } from "./componentes/hcarbono/hcarbono.component";
import { HhidricaComponent } from "./componentes/hhidrica/hhidrica.component";
import { ResultadoComponent } from "./componentes/resultado/resultado.component";
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

const routes: Routes = [
  { path: "", component: InicioComponent },

  { path: "general", component: GeneralComponent },
  { path: "energia", component: EnergiaComponent },
  { path: "habitos", component: LavamanosComponent },
  { path: "vehicPropio", component: VehicPropioComponent },
  { path: "jardin", component: JardinComponent },
  { path: "ropa", component: RopaComponent },
  { path: "desayuno", component: DesayunoComponent },
  { path: "publico", component: PublicoComponent },
  { path: "vehicpropioHC", component: VehicpropioHCComponent },
  { path: "interprov", component: InterprovincialComponent },
  { path: "aereo", component: AereoComponent },
  { path: "residuos", component: ResiduosComponent },
  { path: "hcarbono", component: HcarbonoComponent },
  { path: "hhidrica", component: HhidricaComponent },
  { path: "resultado", component: ResultadoComponent },
  { path: "analisis", component: AnalisisComponent },
  { path: "alwa", component: AlwaComponent },
  { path: "nuevotab4", component: Nuevotab4Component },
  { path: "servicioPubHC", component: ServicioHCComponent },
  { path: "tarea1", component: Tarea1Component },
  { path: "tarea2", component: Tarea2Component },
  { path: "tarea3", component: Tarea3Component },
  { path: "eliminar", component: EliminarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
