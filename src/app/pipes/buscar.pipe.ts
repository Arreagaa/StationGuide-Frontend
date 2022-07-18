import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(gasolineras:any, buscar:any) {
    if(buscar == undefined){
      return gasolineras;
    }else{
      return gasolineras.filter(gasolineras =>{
        return gasolineras.nombreGas.toLowerCase().includes(buscar.toLowerCase()) || gasolineras.direccion.toLowerCase().includes(buscar.toLowerCase()) ||
        gasolineras.departamento.toLowerCase().includes(buscar.toLowerCase()) 
      })
    }
  }

}
