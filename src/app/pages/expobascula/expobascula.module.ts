import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpobasculaRoutingModule } from './expobascula-routing.module';
import { ExpobasculaComponent } from './expobascula.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ExpobasculaComponent
  ],
  imports: [
    CommonModule,
    ExpobasculaRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule
  ],
})
export class ExpobasculaModule { }
