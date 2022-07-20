import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarNew'
})
export class BuscarNewPipe implements PipeTransform {

  transform(news:any, buscar:any) {
    if(buscar == undefined){
      return news;
    }else{
      return news.filter(news =>{
        return news.titulo.toLowerCase().includes(buscar.toLowerCase()) || news.editorial.toLowerCase().includes(buscar.toLowerCase())
      })
    }
  }

}

