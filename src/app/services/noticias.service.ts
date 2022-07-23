import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Noticias } from '../models/noticias.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  public url: String = 'https://station-guide.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerNoticias(): Observable<any> {
    //let headersToken = this.headersVariable.set('Authorization', token)

    //return this._http.get(this.url + '/obtenerHoteles', { headers: headersToken })
    return this._http.get(this.url + '/obtenerNoticias', { headers: this.headersVariable })
  }

  agregarNoticias(NoticiasModel: Noticias, token): Observable<any> {
    let parametros = JSON.stringify(NoticiasModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/agregarNoticia', parametros, {headers: headersToken})
  }

  obtenerNoticiaId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerNoticiaId/' + id, {headers: headersToken})
  }

  editarNoticia(NoticiasModel: Noticias, token): Observable<any> {
    let parametros = JSON.stringify(NoticiasModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarNoticia/' + NoticiasModel._id, parametros, { headers: headersToken })
  }

  eliminarNoticia(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarNoticia/' + id, { headers: headersToken })
  }
}
