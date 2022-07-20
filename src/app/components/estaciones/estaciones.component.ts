import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';

//Gasolineras
import { Gasolineras } from 'src/app/models/gasolineras.model';
import { GasolinerasService } from 'src/app/services/gasolineras.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrls: ['./estaciones.component.scss'],
  providers: [ UsuarioService, GasolinerasService]
})
export class EstacionesComponent implements OnInit {

  public token;
  public idGasolinera;

  //DATOS DE LA GASOLINERA
  public gasolineraModelGetId: Gasolineras;
  public gasolineraModelGet: Gasolineras;

  constructor(public _usuarioService: UsuarioService, public _gasolinerasService: GasolinerasService, public _activatedRoute: ActivatedRoute) {
    this.gasolineraModelGetId = new Gasolineras('','','','','',0)
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getGasolineraId(dataRuta.get('idGasolinera'));

      this.idGasolinera = dataRuta.get('idGasolinera');

    });
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

}
