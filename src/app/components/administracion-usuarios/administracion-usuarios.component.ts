import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//USUARIOS
import { Usuario } from 'src/app/models/usuario.model';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html',
  styleUrls: ['./administracion-usuarios.component.scss'],
  providers: [ UsuarioService ]
})
export class AdministracionUsuariosComponent implements OnInit {

  public token;
  public idUsuarios;

  //USUARIO
  public usuarioModelGet: Usuario;
  public usuarioModelPost: Usuario;
  public usuarioModelGetId: Usuario;

  constructor(private _usuarioService: UsuarioService) {
    this.usuarioModelPost = new Usuario('','', '','', '', '','');
    this.usuarioModelGetId = new Usuario('','','','','','','');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this._usuarioService.obtenerClientes(this.token).subscribe(
      (response) => {
        this.usuarioModelGet = response.usuarios;
        console.log(response);
        console.log(this.usuarioModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getUsuariosId(idUsuarios){
    this._usuarioService.obtenerClienteId(idUsuarios, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.usuarioModelGetId = response.usuarios;
        console.log(response);
        console.log(this.usuarioModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  deleteUsuarios() {
    Swal.fire({
      icon: "warning",
      title: "¿Desea Continuar?",
      text: "Penalización de Usuario",
      showCancelButton: true,
      confirmButtonColor: '#6793F4',
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, penalizar.",
      cancelButtonText: "Cancelar",
      footer: '<a>Usuario Penalizado.</a>'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.eliminarClientePerfil(this.usuarioModelGetId,this.token).subscribe({
      next: (response: any) => {
        Swal.fire("Usuario Penalizado", "Penalizado correctamente", "success");
        this.getUsuarios();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Algo no se encuentra bien!',
          footer: 'Haznos saber el error, ¡gracias!',
          confirmButtonColor: '#6793F4'
        })
        console.log(<any>err)
      },
      complete: () => {
      }
    });
      }
    });
  }


}
