import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameRoutingModule } from './frame-routing.module';
import { FrameComponent } from './frame.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    FrameComponent
  ],
  imports: [
    CommonModule,
    FrameRoutingModule,
    CarouselModule
  ]
})
export class FrameModule { }
