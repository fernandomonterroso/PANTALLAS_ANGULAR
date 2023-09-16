import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesocargaComponent } from './pesocarga.component';

const routes: Routes = [{ path: '', component: PesocargaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PesocargaRoutingModule { }
