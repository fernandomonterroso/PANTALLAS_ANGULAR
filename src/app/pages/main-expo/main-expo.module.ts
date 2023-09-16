import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MainExpoRoutingModule } from './main-expo-routing.module';
import { MainExpoComponent } from './main-expo.component';



@NgModule({
  declarations: [
    MainExpoComponent
  ],
  imports: [
    CommonModule,
    MainExpoRoutingModule,
    MatGridListModule,
    MatCardModule,
  ]
})
export class MainExpoModule { }
