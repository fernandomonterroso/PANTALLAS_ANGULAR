import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasculaComponent } from './bascula.component';

const routes: Routes = [{ path: '', component: BasculaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasculaRoutingModule { }
