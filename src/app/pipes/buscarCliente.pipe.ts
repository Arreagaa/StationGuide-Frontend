import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarCliente'
})
export class BuscarClientePipe implements PipeTransform {

  transform(sucursales:any, buscar:any) {
    if(buscar == undefined){
      return sucursales;
    }else{
      return sucursales.filter(sucursales =>{
        return sucursales.direccion.toLowerCase().includes(buscar.toLowerCase()) || sucursales.departamento.toLowerCase().includes(buscar.toLowerCase())
        || sucursales.nombreSucursal.toLowerCase().includes(buscar.toLowerCase())
      })
    }
  }

}
