import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { interval, Observable } from 'rxjs';
import { GlobalService } from 'src/app/shared/services/global.service';
@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})

export class FrameComponent implements OnInit {

  

  public customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 60000,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    navSpeed: 4000,
    dotsSpeed: 4000,
    nav: true,
    //dotsSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }
  obsTimer: Observable<number> = interval(3600000);
  currTime: number=0;
  constructor(private _GlobalService: GlobalService) { }

  ngOnInit(): void {
    
    this.obsTimer.subscribe(currTime =>{
        this.currTime = currTime;
        window.location.reload();
      },error =>{
        this._GlobalService.alertaError({mensaje:"Error inesperado: "+error});
      }
    );
  }
    

}
