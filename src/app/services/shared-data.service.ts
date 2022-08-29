import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private hCarbono: BehaviorSubject<boolean>;
  huellaCarbono: Observable<boolean>;

  private hHidrica: BehaviorSubject<boolean>;
  huellaHidrica: Observable<boolean>;

  private hEcologica: BehaviorSubject<boolean>;
  huellaEcologica: Observable<boolean>;

  private tieneVehicPropio: BehaviorSubject<boolean>;
  vehicPropio: Observable<boolean>;

  private oPersona: BehaviorSubject<any>;
  persona: Observable<any>;

  private oEnergia: BehaviorSubject<any>;
  energia: Observable<any>;

  private oAereo: BehaviorSubject<any[]>;
  aereo: Observable<any[]>;

  private oAlmuerzo: BehaviorSubject<any>;
  almuerzo: Observable<any>;

  private oCena: BehaviorSubject<any>;
  cena: Observable<any>;

  private oDesayuno: BehaviorSubject<any>;
  desayuno: Observable<any>;

  private oBebida: BehaviorSubject<any>;
  bebida: Observable<any>;

  private oFruta: BehaviorSubject<any>;
  fruta: Observable<any>;

  private oInterprov: BehaviorSubject<any[]>;
  interprov: Observable<any[]>;

  private oJardin: BehaviorSubject<any>;
  jardin: Observable<any>;

  private oHabitos: BehaviorSubject<any>;
  habitos: Observable<any>;


  private oServicios: BehaviorSubject<any>;
  servicios: Observable<any>;


  private otPublico: BehaviorSubject<any>;
  tPublico: Observable<any>;

  private oVehicPropio: BehaviorSubject<any>;
  vehiculoPropio: Observable<any>;

  private oRopa: BehaviorSubject<any>;
  ropa: Observable<any>;

  private oResiduos: BehaviorSubject<any>;
  residuos: Observable<any>;

  private oTotalEmisiones: BehaviorSubject<Number>;
  totalEmision: Observable<Number>;

  private oFileNameHC: BehaviorSubject<String>;
  fileNameHC: Observable<String>;

  private oTotalAgua: BehaviorSubject<Number>;
  totalAgua: Observable<Number>;

  private oFileNameHH: BehaviorSubject<String>;
  fileNameHH: Observable<String>;

  private IDPersonaHC: BehaviorSubject<Number>;
  idPersonaHC: Observable<Number>;

  private IDPersonaHH: BehaviorSubject<Number>;
  idPersonaHH: Observable<Number>;

  private oResultadoGEI: BehaviorSubject<any>;
  resultadoGEI: Observable<any>;

  constructor() {

    TODO: this.hCarbono = new BehaviorSubject<boolean>(JSON.parse(sessionStorage.getItem("hCarbono")));
    // this.hCarbono = new BehaviorSubject<boolean>(true);
    this.huellaCarbono = this.hCarbono.asObservable();

    TODO: this.hHidrica = new BehaviorSubject<boolean>(JSON.parse(sessionStorage.getItem("hHidrica")));
    //this.hHidrica = new BehaviorSubject<boolean>(true);
    this.huellaHidrica = this.hHidrica.asObservable();

    this.hEcologica = new BehaviorSubject<boolean>(JSON.parse(sessionStorage.getItem("hEcologica")));
    this.huellaEcologica = this.hEcologica.asObservable();

    this.tieneVehicPropio = new BehaviorSubject<boolean>(JSON.parse(sessionStorage.getItem("tieneVehiculo")));
    this.vehicPropio = this.tieneVehicPropio.asObservable();

    this.oPersona = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("persona")));
    this.persona = this.oPersona.asObservable();

    this.oEnergia = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("energia")));
    this.energia = this.oEnergia.asObservable();

    this.oAereo = new BehaviorSubject<any[]>(JSON.parse(sessionStorage.getItem("aereo")));
    this.aereo = this.oAereo.asObservable();

    this.oDesayuno = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("desayuno")));
    this.desayuno = this.oDesayuno.asObservable();

    this.oAlmuerzo = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("almuerzo")));
    this.almuerzo = this.oAlmuerzo.asObservable();

    this.oCena = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("cena")));
    this.cena = this.oCena.asObservable();

    this.oFruta = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("fruta")));
    this.fruta = this.oFruta.asObservable();

    this.oBebida = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("bebida")));
    this.bebida = this.oBebida.asObservable();

    this.oInterprov = new BehaviorSubject<any[]>(JSON.parse(sessionStorage.getItem("interprov")));
    this.interprov = this.oInterprov.asObservable();

    this.oJardin = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("jardin")));
    this.jardin = this.oJardin.asObservable();

    this.oHabitos = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("habitos")));
    this.habitos = this.oHabitos.asObservable();

    this.oServicios = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("servicios")));
    this.servicios = this.oServicios.asObservable();

    this.otPublico = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("tPublico")));
    this.tPublico = this.otPublico.asObservable();

    this.otPublico = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("tPublico")));
    this.tPublico = this.otPublico.asObservable();

    this.oVehicPropio = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("vehicPropio")));
    this.vehiculoPropio = this.oVehicPropio.asObservable();

    this.oRopa = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("ropa")));
    this.ropa = this.oRopa.asObservable();

    this.oResiduos = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("residuos")));
    this.residuos = this.oResiduos.asObservable();

    this.oTotalEmisiones = new BehaviorSubject<Number>(JSON.parse(localStorage.getItem("totalGEI")));
    this.totalEmision = this.oTotalEmisiones.asObservable();

    this.oFileNameHC = new BehaviorSubject<String>(JSON.parse(sessionStorage.getItem("reporteHC")));
    this.fileNameHC = this.oFileNameHC.asObservable();

    this.oTotalAgua = new BehaviorSubject<Number>(JSON.parse(localStorage.getItem("totalAgua")));
    this.totalAgua = this.oTotalAgua.asObservable();

    this.oFileNameHH = new BehaviorSubject<String>(JSON.parse(sessionStorage.getItem("reporteHH")));
    this.fileNameHH = this.oFileNameHH.asObservable();

    this.IDPersonaHC = new BehaviorSubject<Number>(JSON.parse(localStorage.getItem("idPersonaHC")));
    this.idPersonaHC = this.IDPersonaHC.asObservable();

    this.IDPersonaHH = new BehaviorSubject<Number>(JSON.parse(localStorage.getItem("idPersonaHH")));
    this.idPersonaHH = this.IDPersonaHH.asObservable();

    this.oResultadoGEI = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("resultadoGEI")));
    this.resultadoGEI = this.oResultadoGEI.asObservable();
  }

  sethCarbonoValue(checked: boolean) {
    this.hCarbono.next(checked);
    sessionStorage.setItem("hCarbono", JSON.stringify(checked));
  }

  sethHidricaValue(checked: boolean) {
    this.hHidrica.next(checked);
    sessionStorage.setItem("hHidrica", JSON.stringify(checked));
  }

  sethEcologicaValue(checked: boolean) {
    this.hEcologica.next(checked);
    sessionStorage.setItem("hEcologica", JSON.stringify(checked));
  }

  setTieneVehiculoValue(checked: boolean) {
    this.tieneVehicPropio.next(checked);
    sessionStorage.setItem("tieneVehiculo", JSON.stringify(checked));
  }

  setPersona(persona: any) {
    this.oPersona.next(persona);
    sessionStorage.setItem("persona", JSON.stringify(persona));
  }

  setEnergia(energia: any) {
    this.oEnergia.next(energia);
    sessionStorage.setItem("energia", JSON.stringify(energia));
  }

  setAereo(lstAereo: any[]) {
    this.oAereo.next(lstAereo);
    sessionStorage.setItem("aereo", JSON.stringify(lstAereo));
  }

  setDesayuno(desayuno: any) {
    this.oDesayuno.next(desayuno);
    sessionStorage.setItem("desayuno", JSON.stringify(desayuno));
  }

  setAlmuerzo(almuerzo: any) {
    this.oAlmuerzo.next(almuerzo);
    sessionStorage.setItem("almuerzo", JSON.stringify(almuerzo));
  }

  setCena(cena: any) {
    this.oCena.next(cena);
    sessionStorage.setItem("cena", JSON.stringify(cena));
  }

  setFruta(fruta: any) {
    this.oFruta.next(fruta);
    sessionStorage.setItem("fruta", JSON.stringify(fruta));
  }

  setBebida(bebida: any) {
    this.oBebida.next(bebida);
    sessionStorage.setItem("bebida", JSON.stringify(bebida));
  }

  setInterprov(lstInterprov: any[]) {
    this.oInterprov.next(lstInterprov);
    sessionStorage.setItem("interprov", JSON.stringify(lstInterprov));
  }

  setJardin(jardin: any) {
    this.oJardin.next(jardin);
    sessionStorage.setItem("jardin", JSON.stringify(jardin));
  }

  setHabitos(habitos: any) {
    this.oHabitos.next(habitos);
    sessionStorage.setItem("habitos", JSON.stringify(habitos));
  }


  setServicios(servicios: any) {
    this.oServicios.next(servicios);
    sessionStorage.setItem("servicios", JSON.stringify(servicios));
  }

  setTPublico(tpublico: any) {
    this.otPublico.next(tpublico);
    sessionStorage.setItem("tPublico", JSON.stringify(tpublico));
  }

  setVehicPropio(vehicPropio: any) {
    this.oVehicPropio.next(vehicPropio);
    sessionStorage.setItem("vehicPropio", JSON.stringify(vehicPropio));
  }

  setRopa(ropa: any) {
    this.oRopa.next(ropa);
    sessionStorage.setItem("ropa", JSON.stringify(ropa));
  }

  setResiduos(residuos: any) {
    this.oResiduos.next(residuos);
    sessionStorage.setItem("residuos", JSON.stringify(residuos));
  }

  setTotalEmision(total: Number) {
    this.oTotalEmisiones.next(total);
    localStorage.setItem("totalGEI", JSON.stringify(total));
  }

  setFileNameHC(fileName: String) {
    this.oFileNameHC.next(fileName);
    sessionStorage.setItem("fileNameHC", JSON.stringify(fileName));
  }

  setTotalAgua(total: Number) {
    this.oTotalAgua.next(total);
    localStorage.setItem("totalAgua", JSON.stringify(total));
  }

  setFileNameHH(fileName: String) {
    this.oFileNameHH.next(fileName);
    sessionStorage.setItem("fileNameHH", JSON.stringify(fileName));
  }

  setIDPersonaHC(id: Number) {
    this.IDPersonaHC.next(id);
    localStorage.setItem("idPersonaHC", JSON.stringify(id));

  }

  setIDPersonaHH(id: Number) {
    this.IDPersonaHH.next(id);
    localStorage.setItem("idPersonaHH", JSON.stringify(id));

  }


  setResultadoGEI(resultados: any) {
    this.oResultadoGEI.next(resultados);
    localStorage.setItem("resultadoGEI", JSON.stringify(resultados));
  }


  get resultadoGEIValue(): any {
    return this.oResultadoGEI.value;
  }


  get hCarbonoValue(): boolean {
    return this.hCarbono.value;
  }

  get hHidricaValue(): boolean {
    return this.hHidrica.value;
  }

  get hEcologicaValue(): boolean {
    return this.hEcologica.value;
  }

  get tieneVehiculoValue(): boolean {
    return this.tieneVehicPropio.value;
  }

  get personaValue(): any {
    return this.oPersona.value;
  }

  get energiaValue(): any {
    return this.oEnergia.value;
  }

  get lstAereo(): any[] {
    return this.oAereo.value;
  }

  get desayunoValue(): any {
    return this.oDesayuno.value;
  }

  get almuerzoValue(): any {
    return this.oAlmuerzo.value;
  }

  get cenaValue(): any {
    return this.oCena.value;
  }

  get frutaValue(): any {
    return this.oFruta.value;
  }

  get bebidaValue(): any {
    return this.oBebida.value;
  }

  get lstInterprov(): any[] {
    return this.oInterprov.value;
  }

  get jardinValue(): any {
    return this.oJardin.value;
  }

  get habitosValue(): any[] {
    return this.oHabitos.value;
  }
  get serviciosValue(): any[] {
    return this.oServicios.value;
  }

  get tPublicoValue(): any {
    return this.otPublico.value;
  }

  get vehicPropioValue(): any {
    return this.oVehicPropio.value;
  }

  get ropaValue(): any {
    return this.oRopa.value;
  }

  get residuosValue(): any {
    return this.oResiduos.value;
  }

  get totalGEIValue(): Number {
    return this.oTotalEmisiones.value;
  }

  get fileNameHCValue(): String {
    return this.oFileNameHC.value;
  }

  get totalAguaValue(): Number {
    return this.oTotalAgua.value;
  }

  get fileNameHHValue(): String {
    return this.oFileNameHH.value;
  }

  get IDPersonaHCValue(): Number {
    return this.IDPersonaHC.value;
  }

  get IDPersonaHHValue(): Number {
    return this.IDPersonaHH.value;
  }

}
