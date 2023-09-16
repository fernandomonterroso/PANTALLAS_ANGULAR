import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultadoBusqueda: string[] = [];
    for(const post of value){
      if(post.GUIA.indexOf(arg) > -1){
        resultadoBusqueda.push(post)
      }
    }
    return resultadoBusqueda;
  }

}
