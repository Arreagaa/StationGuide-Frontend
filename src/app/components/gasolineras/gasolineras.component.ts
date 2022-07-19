import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//GASOLINERAS
import { Gasolineras } from 'src/app/models/gasolineras.model';
import { GasolinerasService } from 'src/app/services/gasolineras.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-gasolineras',
  templateUrl: './gasolineras.component.html',
  styleUrls: ['./gasolineras.component.scss'],
  providers: [ GasolinerasService, UsuarioService ]
})
export class GasolinerasComponent implements OnInit {

  public token;
  public buscar;

  //Gasolineras
  public gasolinerasModelGet: Gasolineras;
  public gasolinerasModelPost: Gasolineras;
  public gasolinerasModelGetId: Gasolineras;

  constructor(private _gasolinerasService: GasolinerasService, public _usuarioService: UsuarioService) {
    this.gasolinerasModelPost = new Gasolineras('','', '','', '', 0);
    this.gasolinerasModelGetId = new Gasolineras('','', '','', '', 0);
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.getGasolineras();
  }

  getGasolineras(){
    this._gasolinerasService.obtenerGasolineras().subscribe(
      (response) => {
        this.gasolinerasModelGet = response.gasolineras;
        console.log(response);
        console.log(this.gasolinerasModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getGasolinerasId(idGas){
    this._gasolinerasService.obtenerGasolineraId(idGas, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.gasolinerasModelGetId = response.gasolineras;
        console.log(response);
        console.log(this.gasolinerasModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postGasolinera(addForm){
    this._gasolinerasService.agregarGasolinera(this.gasolinerasModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getGasolineras();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado la Gasolinera Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes verificar la nueva Gasolinera.</a>',
          confirmButtonColor: '#6793F4'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: '<a>No dejes campos vacios, ¡gracias!</a>',
          confirmButtonColor: '#6793F4'
        })
      }
    )
  }

  putGasolinera(){
    this._gasolinerasService.editarGasolinera(this.gasolinerasModelGetId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getGasolineras();
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en la Gasolinera',
          text: '¡Puedes Revisar la Gasolinera Actualizada!',
          footer: '<a>Función concretada correctamente.</a>',
          confirmButtonColor: '#6793F4'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: 'No dejes campos vacios, ¡gracias!',
          confirmButtonColor: '#6793F4'
        })
      }
    )
  }

  deleteGasolinera(idGas) {
  Swal.fire({
    icon: "warning",
    title: "¿Desea Continuar?",
    text: "Eliminación de Gasolinera",
    showCancelButton: true,
    confirmButtonColor: '#6793F4',
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar.",
    cancelButtonText: "Cancelar",
    footer: '<a>Función por concretar.</a>'
  }).then((result) => {
    if (result.isConfirmed) {
      this._gasolinerasService.eliminarGasolinera(idGas, this.token).subscribe({
    next: (response: any) => {
      Swal.fire("Gasolinera Eliminada", "Se elimino correctamente", "success");
      this.getGasolineras();
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
}
