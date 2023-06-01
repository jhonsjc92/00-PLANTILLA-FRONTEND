import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoPipe'
})
export class EstadoPipe implements PipeTransform {

  transform(estado: any): string {
    if (estado === 0)
      return 'INACTIVO';
    if (estado === 1)
      return 'ACTIVO';
    return '';
  }

}