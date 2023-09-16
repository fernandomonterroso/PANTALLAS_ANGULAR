import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesoRoutingModule } from './acceso-routing.module';
import { AccesoComponent } from './acceso.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    AccesoComponent
  ],
  imports: [
    CommonModule,
    AccesoRoutingModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule
  ]
})
export class AccesoModule { }
