import { NgModule, Component, Pipe } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { BasculaRoutingModule } from './bascula-routing.module';
import { BasculaComponent } from './bascula.component';
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { FilterPipe } from './pipes/filter.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [
    BasculaComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    BasculaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatGridListModule,
  ],
  providers: [
    DatePipe,
  ]
})

export class BasculaModule { }
