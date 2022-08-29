import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { RestdataService } from 'src/app/services/restdata.service';

@Component({
  selector: 'app-serviciovehicpropio-hc',
  templateUrl: './servicio-hc.component.html',
  styleUrls: ['./servicio-hc.component.scss']
})
export class ServicioHCComponent implements OnInit {
  hHidrica = false;
  hCarbono = false;
  tPublico: any = {};
  //vehicPropio: any = {};

  //tieneVehicPropio = true;
  //noUsoTransporte = false;

  //lstTipoCombustible: any[];
  lstTipoTransporte: any[];
  totalAgua: Number;
  fileName: String;
  idPersona: Number;

  viewButton = false;
  loading = false;

  //fhidrica = false;


  constructor(private router: Router,
    private adminService: AdminService,
    private sharedData: SharedDataService, private restdata: RestdataService) {
    //this.fnTipoCombustible();
    this.fnTipoTransporte();
  }

  ngOnInit() {
    this.hCarbono = this.sharedData.hCarbonoValue;
    this.hHidrica = this.sharedData.hHidricaValue;
    this.tPublico = this.sharedData.tPublicoValue != null ? this.sharedData.tPublicoValue : {};
    //this.vehicPropio = this.sharedData.vehicPropioValue != null ? this.sharedData.vehicPropioValue : {};
    this.viewButton = this.sharedData.hHidricaValue && !this.sharedData.hCarbonoValue ? true : false;
    // this.fhidrica = this.sharedData.hHidricaValue;
    console.log(this.viewButton);
  }


  /* fnTipoCombustible() {
     this.adminService.listarParamByTipo("TIPO_COMBUSTIBLE").subscribe(
       data => {
         if (data.exito) {
           this.lstTipoCombustible = data.datosAdicionales;
         }
       },
       (error: HttpErrorResponse) => {
         console.error(error.message);
       }
     );
   }*/

  fnTipoTransporte() {
    this.adminService.listarParamByTipo("TIPO_TRANSP_PUBLICO").subscribe(
      data => {
        if (data.exito) {
          this.lstTipoTransporte = data.datosAdicionales;
        }
      }
    );
  }

  irSiguiente(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.loading = true;
    // this.sharedData.personaValue.noTransporte = this.tPublico.noUsoTransporte != "si" ? 1 : 0;
    // console.log(this.tPublico.noUsoTransporte);
    // console.log(this.sharedData.personaValue);
    this.sharedData.setTPublico(this.tPublico);

    /*   if (this.vehicPropio.tieneVehiculo == 'si')
        this.sharedData.setVehicPropio(this.vehicPropio);
      else
        this.sharedData.setVehicPropio(null); */

    if (this.sharedData.hCarbonoValue)
      this.router.navigate(['/taxiHC']);
    /*else if (this.sharedData.hHidricaValue && !this.sharedData.hCarbonoValue) {
      let consumoAgua = this.sharedData.ropaValue;
      consumoAgua.areaJardin = this.sharedData.jardinValue.area;
      consumoAgua.volumenPiscina = this.sharedData.jardinValue.volumen;
      consumoAgua.vecesLlenaPiscina = this.sharedData.jardinValue.vecesLlenaPiscina;
      let jsonData = {
        Persona: this.sharedData.personaValue,
        Energia: this.sharedData.energiaValue,
        Desayuno: this.sharedData.desayunoValue,
        Almuerzo: this.sharedData.almuerzoValue,
        Cena: this.sharedData.cenaValue,
        FrutaBebida: this.sharedData.frutaValue,
        VehicPropio: this.sharedData.vehicPropioValue,
        TPublico: this.sharedData.tPublicoValue,
        LstInterprov: this.sharedData.lstInterprov,
        ConsumoAgua: consumoAgua,
        HabitosAgua: this.sharedData.habitosValue
      }
      console.log(JSON.stringify(jsonData));
      this.restdata.registrar(jsonData).subscribe(

        data => {
          console.log(data);

          if (data.exito) {
            let resultado = <String>data.datoAdicional;
            let resultArray = resultado.split(":::");
            this.totalAgua = +resultArray[0];
            this.fileName = resultArray[1];
            this.sharedData.setTotalAgua(this.totalAgua);
            this.sharedData.setFileNameHH(this.fileName);

            this.idPersona = +resultArray[2];

            this.sharedData.setIDPersonaHH(this.idPersona);

            this.router.navigate(['resultado']);
          }
          this.loading = false;

        }
      );
    }*/

  }

  irAnterior() {
    this.sharedData.setTPublico(this.tPublico);
    //this.sharedData.setVehicPropio(this.vehicPropio);

    this.router.navigate(['/vehicpropioHC']);
  }

}
