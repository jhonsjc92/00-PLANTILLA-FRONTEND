import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxFileUploaderModule, DxButtonModule, DxSelectBoxModule, DxValidatorModule } from 'devextreme-angular';
import { AnexosMultipleComponent } from './components/anexos/anexos-multiple.component';
import { CneSelectBoxComponent } from './components/cne-select-box/cne-select-box.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AnexosMultipleComponent,
    CneSelectBoxComponent
  ],
  imports: [
    CommonModule,
    DxFileUploaderModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxValidatorModule,
    ReactiveFormsModule,
  ],
  exports:[
    AnexosMultipleComponent,
    CneSelectBoxComponent
  ]
})
export class SharedModule { }
