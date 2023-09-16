import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpobasculaComponent } from './expobascula.component';
import { MatFormFieldModule } from "@angular/material/form-field";

const routes: Routes = [{ path: '', component: ExpobasculaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), MatFormFieldModule],
  exports: [RouterModule]
})
export class ExpobasculaRoutingModule { }
