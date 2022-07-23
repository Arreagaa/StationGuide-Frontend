import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';

//Gasolineras
import { Gasolineras } from 'src/app/models/gasolineras.model';
import { GasolinerasService } from 'src/app/services/gasolineras.service';

//ESTACIONES
import { Sucursales } from 'src/app/models/sucursales.model';
import { EstacionesService } from 'src/app/services/estaciones.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrls: ['./estaciones.component.scss'],
  providers: [ UsuarioService, GasolinerasService, EstacionesService]
})
export class EstacionesComponent implements OnInit {

  public token;
  public idGasolinera;
  public buscarCliente;

  //DATOS DE LA GASOLINERA
  public gasolineraModelGetId: Gasolineras;
  public gasolineraModelGet: Gasolineras;

  //ESTACTIONES
  public sucursalesModelGet: Sucursales;
  public sucursaleslModelPost: Sucursales;
  public sucursalesModelGetId: Sucursales;

  constructor(public _usuarioService: UsuarioService, public _gasolinerasService: GasolinerasService, public _activatedRoute: ActivatedRoute,
    public _estacionesService: EstacionesService) {

    this.gasolineraModelGetId = new Gasolineras('','','','','',0)
    this.token = this._usuarioService.obtenerToken();

    //ESTACTIONES
    this.sucursaleslModelPost = new Sucursales('','', '','',0,0,0,true,'');
    this.sucursalesModelGetId = new Sucursales('','', '','',0,0,0, true,'');
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getGasolineraId(dataRuta.get('idGasolinera'));

      this.idGasolinera = dataRuta.get('idGasolinera');
    });

    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getEstaciones(dataRuta.get('idGasolinera'));

      this.idGasolinera = dataRuta.get('idGasolinera')
    });

    this.sucursaleslModelPost = new Sucursales('','', '','',0,0,0, true,this.idGasolinera)
  }

  //OBTENER DATOS DE LA GASOLINERA POR SU ID
  getGasolineraId(idGasolinera){
    this._gasolinerasService.obtenerGasolineraId(idGasolinera, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.gasolineraModelGetId = response.gasolineras;
        console.log(response);
        console.log(this.gasolineraModelGetId);
      },
      (error)=>{
        console.log(<any>error);
        console.log(this.gasolineraModelGetId);
        console.log(this.idGasolinera)

      }
    )
  }

  //ESTACIONES

  getEstaciones(idGasolinera){
    this._estacionesService.obtenerSucursales(idGasolinera).subscribe(
      (response) => {
        this.sucursalesModelGet = response.sucursales;
        console.log(response);
        console.log(this.sucursalesModelGet);
      },
      (error)=>{
        console.log(<any>error);
        console.log(this.sucursalesModelGet);
      }
    )
  }

  getEstacionesId(idGasolinera){
    this._estacionesService.obtenerSucursalId(idGasolinera, this._usuarioService.obtenerToken()).subscribe(
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

  postEstaciones(addForm){
    this._estacionesService.agregarSucursal(this.sucursaleslModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEstaciones(this.idGasolinera);
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado la Estación Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes verificar la nueva Estación.</a>',
          confirmButtonColor: '#6793F4',
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: '<a>No dejes campos vacios, ¡gracias!</a>',
          confirmButtonColor: '#6793F4',
        })
      }
    )
  }

  putEstaciones(){
    this._estacionesService.editarSucursal(this.sucursalesModelGetId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEstaciones(this.idGasolinera);
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en la Estación',
          text: '¡Puedes Revisar la Estación Actualizada!',
          footer: '<a>Función concretada correctamente.</a>',
          confirmButtonColor: '#6793F4',
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: 'No dejes campos vacios, ¡gracias!',
          confirmButtonColor: '#6793F4',
        })
      }
    )
  }

  deleteEstaciones(idGasolinera) {
    Swal.fire({
      icon: "warning",
      title: "¿Desea Continuar?",
      text: "Eliminación de Estación",
      showCancelButton: true,
      confirmButtonColor: '#6793F4',
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar.",
      cancelButtonText: "Cancelar",
      footer: '<a>Función por concretar.</a>'
    }).then((result) => {
      if (result.isConfirmed) {
        this._estacionesService.eliminarSucursal(idGasolinera, this.token).subscribe({
      next: (response: any) => {
        Swal.fire("Estación Eliminada", "Se elimino correctamente", "success");
        this.getEstaciones(this.idGasolinera);
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Algo no se encuentra bien!',
          footer: 'Haznos saber el error, ¡gracias!',
          confirmButtonColor: '#6793F4'
        })
      },
      complete: () => {
      }
    });
      }
    });
  }

  getMejorPrecioDiesel(){
    this._estacionesService.obtenerMejorPrecioDiesel().subscribe(
      (response) => {
        this.sucursalesModelGet = response.sucursales;

        console.log(response);
        console.log(this.sucursalesModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getMejorPrecioRegular(){
    this._estacionesService.obtenerMejorPrecioRegular().subscribe(
      (response) => {
        this.sucursalesModelGet = response.sucursales;

        console.log(response);
        console.log(this.sucursalesModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getMejorPrecioSuper(){
    this._estacionesService.obtenerMejorPrecioSuper().subscribe(
      (response) => {
        this.sucursalesModelGet = response.sucursales;

        console.log(response);
        console.log(this.sucursalesModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getGasolineraMarket(){
    this._estacionesService.obtenerGasolineraMarket().subscribe(
      (response) => {
        this.sucursalesModelGet = response.sucursales;

        console.log(response);
        console.log(this.sucursalesModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

}
