import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainExpoComponent } from './main-expo.component';

const routes: Routes = [{ path: '', component: MainExpoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainExpoRoutingModule { }
