import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDataResponse } from '../IDataResponse';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RestdataService {
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }
    )
  };

  urlRegistrar = environment.baseUrl + '/rest/hpersonal/registrar';
  urlDownloadFile = environment.baseUrl + '/rest/descarga/getFile?';
  urlResultadoHH = environment.baseUrl + '/rest/hpersonal/resultadoHH';
  urlResultadoGEI = environment.baseUrl + '/rest/hpersonal/resultadoGEI';

  constructor(private http: HttpClient) { }

  registrar(jsonParam: any) {
    let filtro = jsonParam;

    return this.http.post<IDataResponse>(this.urlRegistrar, JSON.stringify(filtro), this.options);
  }

  downloadFile(fileName: String, fileNameRef: String) {
    console.log("archivo Ref:" + fileNameRef + "- fileName:" + fileName);
    window.open(this.urlDownloadFile + "fileNameRef=" + fileNameRef + "&fileName=" + fileName, "_blank");
  }


  resultadoHH(jsonParam: any) {
    let filtro = jsonParam;

    return this.http.post<IDataResponse>(this.urlResultadoHH, JSON.stringify(filtro), this.options);
  }

  resultadoGEI(jsonParam: any) {
    let filtro = jsonParam;

    return this.http.post<IDataResponse>(this.urlResultadoGEI, JSON.stringify(filtro), this.options);
  }


}

