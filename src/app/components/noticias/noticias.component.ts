import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//GASOLINERAS
import { Noticias } from 'src/app/models/noticias.model';
import { NoticiasService } from 'src/app/services/noticias.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
  providers: [ UsuarioService, NoticiasService ]
})
export class NoticiasComponent implements OnInit {

  public token;
  public buscarNew;

  //Noticias
  public noticiasModelGet: Noticias;
  public noticiasModelPost: Noticias;
  public noticiasModelGetId: Noticias;

  constructor(public _usuarioService: UsuarioService, public _noticiasService: NoticiasService) {
    this.noticiasModelPost = new Noticias('','', '','', '');
    this.noticiasModelGetId = new Noticias('','', '','', '');
    this.token = this._usuarioService.obtenerToken();
   }

   ngOnInit(): void {
    this.getNoticias();
  }

  getNoticias(){
    this._noticiasService.obtenerNoticias().subscribe(
      (response) => {
        this.noticiasModelGet = response.noticias;
        console.log(response);
        console.log(this.noticiasModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getNoticiasId(idNoticia){
    this._noticiasService.obtenerNoticiaId(idNoticia, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.noticiasModelGetId = response.noticias;
        console.log(response);
        console.log(this.noticiasModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postNoticias(addForm){
    this._noticiasService.agregarNoticias(this.noticiasModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getNoticias();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado la Noticia o Recomendación',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes verificar la nueva Noticia o Recomendación.</a>',
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

  putNoticias(){
    this._noticiasService.editarNoticia(this.noticiasModelGetId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getNoticias();
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en la Noticia o Recomendación.',
          text: '¡Puedes Revisar la Noticia o Recomendación Actualizada!',
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

  deleteNoticias(idNoticia) {
  Swal.fire({
    icon: "warning",
    title: "¿Desea Continuar?",
    text: "Eliminación de Noticia o Recomendación",
    showCancelButton: true,
    confirmButtonColor: '#6793F4',
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar.",
    cancelButtonText: "Cancelar",
    footer: '<a>Función por concretar.</a>'
  }).then((result) => {
    if (result.isConfirmed) {
      this._noticiasService.eliminarNoticia(idNoticia, this.token).subscribe({
    next: (response: any) => {
      Swal.fire("Noticia o Recomendación Eliminada", "Se elimino correctamente", "success");
      this.getNoticias();
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
