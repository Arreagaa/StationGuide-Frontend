import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Sucursales } from '../models/sucursales.model';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {
  public url: String = 'https://station-guide.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerSucursales(id: String): Observable<any> {
    //let headersToken = this.headersVariable.set('Authorization', token)

    //return this._http.get(this.url + '/obtenerHoteles', { headers: headersToken })headers: this.headersVariable
    return this._http.get(this.url + '/obtenerSucursales/' + id, { headers: this.headersVariable  })
  }

  agregarSucursal(SucursalesModel: Sucursales, token): Observable<any> {
    let parametros = JSON.stringify(SucursalesModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/agregarSucursal', parametros, {headers: headersToken})
  }

  obtenerSucursalId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerSucursalId/' + id, {headers: headersToken})
  }

  editarSucursal(SucursalesModel: Sucursales, token): Observable<any> {
    let parametros = JSON.stringify(SucursalesModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarSucursal/' + SucursalesModel._id, parametros, { headers: headersToken })
  }

  eliminarSucursal(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarSucursal/' + id, { headers: headersToken })
  }

  //PRECIOS GASOLINA
  obtenerMejorPrecioDiesel(): Observable<any>{
    //let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerDiesel', {headers: this.headersVariable })
  }

  obtenerMejorPrecioRegular(): Observable<any>{
    //let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerRegular', {headers: this.headersVariable })
  }

  obtenerMejorPrecioSuper(): Observable<any>{
    //let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerSuper', {headers: this.headersVariable })
  }

  //SUPERMARKET
  obtenerGasolineraMarket(): Observable<any>{
    //let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/ObtenerSuperMarket', {headers: this.headersVariable })
  }
}
