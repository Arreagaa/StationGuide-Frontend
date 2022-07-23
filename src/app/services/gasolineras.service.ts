import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Gasolineras } from '../models/gasolineras.model';

@Injectable({
  providedIn: 'root'
})
export class GasolinerasService {
  public url: String = 'https://station-guide.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerGasolineras(): Observable<any> {
    //let headersToken = this.headersVariable.set('Authorization', token)

    //return this._http.get(this.url + '/obtenerHoteles', { headers: headersToken })
    return this._http.get(this.url + '/obtenerGasolineras', { headers: this.headersVariable })
  }

  agregarGasolinera(GasolineraModel: Gasolineras, token): Observable<any> {
    let parametros = JSON.stringify(GasolineraModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/agregarGasolinera', parametros, {headers: headersToken})
  }

  obtenerGasolineraId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerGasolineraId/' + id, {headers: headersToken})
  }

  editarGasolinera(GasolineraModel: Gasolineras, token): Observable<any> {
    let parametros = JSON.stringify(GasolineraModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarGasolinera/' + GasolineraModel._id, parametros, { headers: headersToken })
  }

  eliminarGasolinera(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarGasolinera/' + id, { headers: headersToken })
  }
}
