import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
//import { DialogComponent } from './././shared/components/modals/dialog/dialog.component';
import { DialogComponent } from '../../shared/components/modals/dialog/dialog.component';
@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
    ]
})
export class HomeModule { }
