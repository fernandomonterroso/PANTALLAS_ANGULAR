import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaseVehicularRoutingModule } from './pase-vehicular-routing.module';
import { PaseVehicularComponent } from './pase-vehicular.component';


@NgModule({
  declarations: [
    PaseVehicularComponent
  ],
  imports: [
    CommonModule,
    PaseVehicularRoutingModule
  ]
})
export class PaseVehicularModule { }
