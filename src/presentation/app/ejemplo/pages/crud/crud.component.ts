import { Component } from '@angular/core';
import { Cabecera, Conciliado } from '../../interfaces/cabecara.interface';
import { EjemploService } from '../../services/ejemplo.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent {
  constructor(private ejemploServe : EjemploService){

  }
  cabecera: Cabecera ={ codigo: 0, descripcion: 'des', fecha: "", archivo:[], estado: 0, detalle:'desss'} 
  conciliado:Conciliado={clasePrueba:this.cabecera,claseDetallePrueba:[{descripcion:'descripcion'}]}
    click(event:any){
      console.log("click")
      this.ejemploServe.saveEjemplo(this.conciliado).subscribe();
    }
}
