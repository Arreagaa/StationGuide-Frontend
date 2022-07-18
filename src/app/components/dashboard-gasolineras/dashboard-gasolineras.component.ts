import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//GASOLINERAS
import { Gasolineras } from 'src/app/models/gasolineras.model';
import { GasolinerasService } from 'src/app/services/gasolineras.service';

@Component({
  selector: 'app-dashboard-gasolineras',
  templateUrl: './dashboard-gasolineras.component.html',
  styleUrls: ['./dashboard-gasolineras.component.scss'],
  providers: [ GasolinerasService, UsuarioService ]
})
export class DashboardGasolinerasComponent implements OnInit {

  public token;
  public buscar;

  //Gasolineras
  public gasolinerasModelGet: Gasolineras;

  constructor(private _gasolinerasService: GasolinerasService, public _usuarioService: UsuarioService) {
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

}
