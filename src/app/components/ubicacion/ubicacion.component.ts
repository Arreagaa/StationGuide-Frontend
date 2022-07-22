import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
//NOTICIAS
import { Sucursales } from 'src/app/models/sucursales.model';
import { EstacionesService } from 'src/app/services/estaciones.service';

import {GeolocationService} from '@ng-web-apis/geolocation';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss'],
  providers: [ UsuarioService, EstacionesService ]
})
export class UbicacionComponent implements OnInit {

  public token;
  public idSucursal;
  public geolocation;

  //Sucursales
  public sucursalesModelGetId: Sucursales;

  constructor(public _usuarioService: UsuarioService, public _estacionesService: EstacionesService, public _activatedRoute: ActivatedRoute,
    public readonly geolocation$: GeolocationService) {
    this.sucursalesModelGetId = new Sucursales('','', '','',0,0,0,true,'');
    this.token = this._usuarioService.obtenerToken();
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getEstacionesId(dataRuta.get('idSucursal'));

      this.idSucursal = dataRuta.get('idSucursal');
    });

  }

  getEstacionesId(idSucursal){
    this._estacionesService.obtenerSucursalId(idSucursal, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.sucursalesModelGetId = response.sucursales;
        console.log(response);
        console.log(this.sucursalesModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getPosition() {
    this.geolocation$.subscribe(position =>
     doSomethingWithPosition(position));
}

  //geolocation$.pipe(take(1)).subscribe(position => doSomethingWithPosition(position));
  //geolocation$.subscribe(position => doSomethingWithPosition(position));

}
function doSomethingWithPosition(position: any) {
  throw new Error('Function not implemented.');
}

