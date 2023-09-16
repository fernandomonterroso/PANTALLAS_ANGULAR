import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaseVehicularComponent } from './pase-vehicular.component';

const routes: Routes = [{ path: '', component: PaseVehicularComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaseVehicularRoutingModule { }
