import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './components/detalle/detalle.component';
import { CRUDComponent } from './pages/crud/crud.component';
import { DxDateBoxModule, DxFileUploaderModule, DxNumberBoxModule, DxTextAreaModule, DxTextBoxModule, DxButtonModule } from 'devextreme-angular';
import { CabeceraComponent } from './components/cabecera/cabecera.component';



@NgModule({
  declarations: [
    CabeceraComponent,
    DetalleComponent,
    CRUDComponent,
  ],
  imports: [
    CommonModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxFileUploaderModule,
    DxButtonModule,
  
  ],
  exports:[CRUDComponent]
})
export class EjemploModule { }
