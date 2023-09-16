import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesotaraComponent } from './pesotara.component';

const routes: Routes = [{ path: '', component: PesotaraComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PesotaraRoutingModule { }
