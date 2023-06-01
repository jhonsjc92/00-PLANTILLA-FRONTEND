import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCrcaComponent } from './pages/main-crca/main-crca.component';
import { CreateCrcaComponent } from './pages/create-crca/create-crca.component';
import { DxDataGridModule, DxButtonModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxFileUploaderModule, DxDateBoxModule, DxNumberBoxModule, DxValidatorModule, DxSelectBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { CneDataGridComponent } from './components/cne-data-grid/cne-data-grid.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstadoPipe } from '../shared/pipes/estado.pipe';



@NgModule({
  declarations: [
    MainCrcaComponent,
    CreateCrcaComponent,
    CneDataGridComponent,
    EstadoPipe

  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxFileUploaderModule,
    SharedModule,
    DxDateBoxModule,
    DxNumberBoxModule,
    ReactiveFormsModule,
    DxValidatorModule,
    DxSelectBoxModule,
    DxRadioGroupModule
  ]
})
export class CrcaModule { }
