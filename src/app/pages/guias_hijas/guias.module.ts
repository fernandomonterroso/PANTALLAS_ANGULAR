import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuiasRoutingModule } from './guias-routing.module';
import { GuiasComponent } from './guias.component';


@NgModule({
  declarations: [
    GuiasComponent
  ],
  imports: [
    CommonModule,
    GuiasRoutingModule
  ]
})
export class GuiasModule { }
