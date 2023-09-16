import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PesocargaRoutingModule } from './pesocarga-routing.module';
import { PesocargaComponent } from './pesocarga.component';


@NgModule({
  declarations: [
    PesocargaComponent
  ],
  imports: [
    CommonModule,
    PesocargaRoutingModule
  ]
})
export class PesocargaModule { }
