import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDataResponse } from '../IDataResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }
    )
  };

  urlListarDepartamento = environment.baseUrlAdmin + '/rest/admin/listDepartamento';
  urlListarProvincia = environment.baseUrlAdmin + '/rest/admin/listProvincia';
  urlListarDistrito = environment.baseUrlAdmin + '/rest/admin/listDistrito';
  urlListarParamByTipo = environment.baseUrlAdmin + '/rest/admin/listParamByTipo';
  urlListarTramoOrigen = environment.baseUrlAdmin + '/rest/admin/tramo/origen';
  urlListarTramoDestino = environment.baseUrlAdmin + '/rest/admin/tramo/destino';



  constructor(private http: HttpClient) { }

  listarDepartamento() {
    return this.http.post<IDataResponse>(this.urlListarDepartamento, "", this.options);
  }

  listarProvincia(codDepartamento: String) {
    let filtro = {
      Ubigeo: {
        CodDep: codDepartamento
      }
    };

    return this.http.post<IDataResponse>(this.urlListarProvincia, JSON.stringify(filtro), this.options);
  }

  listarDistrito(codDepartamento: String, codProvincia: String) {
    let filtro = {
      Ubigeo: {
        CodDep: codDepartamento,
        CodProv: codProvincia
      }
    };

    return this.http.post<IDataResponse>(this.urlListarDistrito, JSON.stringify(filtro), this.options);
  }

  listarParamByTipo(tipoParam: String) {
    let filtro = {
      Parametro: {
        tipoParam: tipoParam
      }
    };

    return this.http.post<IDataResponse>(this.urlListarParamByTipo, JSON.stringify(filtro), this.options);
  }

  listarTramoOrigen() {
    return this.http.post<IDataResponse>(this.urlListarTramoOrigen, "", this.options);
  }

  listarTramoDestino(origen: String) {
    let filtro = {
      Tramo: {
        origen: origen
      }
    };

    return this.http.post<IDataResponse>(this.urlListarTramoDestino, JSON.stringify(filtro), this.options);
  }


}
