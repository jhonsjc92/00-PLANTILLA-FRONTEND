import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCrcaComponent } from './crca/pages/main-crca/main-crca.component';
import { CreateCrcaComponent } from './crca/pages/create-crca/create-crca.component';
import { CRUDComponent } from './ejemplo/pages/crud/crud.component';

const routes: Routes = [{
  path: '', component: MainCrcaComponent
},
{
  path: 'create', component: CreateCrcaComponent
},
{
  path: 'edit/:id',
  component: CreateCrcaComponent
},
{
  path: 'ejemplo', component: CRUDComponent
},
{
  path: '**',
  redirectTo: '',
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 