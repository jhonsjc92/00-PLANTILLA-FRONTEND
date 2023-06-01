import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EjemploModule } from './ejemplo/ejemplo.module';
import { DxButtonModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { CRUDComponent } from './ejemplo/pages/crud/crud.component';
import { CrcaModule } from './crca/crca.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    HttpClientModule,
    EjemploModule,
    CrcaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
