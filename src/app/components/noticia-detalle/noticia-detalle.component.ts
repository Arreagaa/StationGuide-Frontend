import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
//NOTICIAS
import { Noticias } from 'src/app/models/noticias.model';
import { NoticiasService } from 'src/app/services/noticias.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.component.html',
  styleUrls: ['./noticia-detalle.component.scss'],
  providers: [ UsuarioService, NoticiasService ]
})
export class NoticiaDetalleComponent implements OnInit {

  public token;
  public idNoticia;

  //Noticias
  public noticiasModelGetId: Noticias;

  constructor(public _usuarioService: UsuarioService, public _noticiasService: NoticiasService, public _activatedRoute: ActivatedRoute) {
    this.noticiasModelGetId = new Noticias('','', '','', '');
    this.token = this._usuarioService.obtenerToken();
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getNoticiasId(dataRuta.get('idNoticia'));

      this.idNoticia = dataRuta.get('idNoticia');
    });

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

}
