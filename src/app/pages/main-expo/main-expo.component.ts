import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { AppComponent } from 'src/app/app.component';
import { ExpoService } from 'src/app/shared/services/expo.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import Swal from 'sweetalert2';
import Swiper from 'swiper';

@Component({
  selector: 'app-main-expo',
  templateUrl: './main-expo.component.html',
  styleUrls: ['./main-expo.component.scss']
})
export class MainExpoComponent implements OnInit {

  public identidad: any;
  public data: any;
  public array: any;
  public newimg: any;

  public opcion = 1;

  constructor(private _appComponent: AppComponent, private _expoService: ExpoService, private _globalService: GlobalService, private _bnNg: BnNgIdleService) { }

  swiperConfig: any = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints: {
        992: {
            spaceBetween: 20
        }
    }
};

onSwiper([swiper]) {
  console.log(swiper);
}
onSlideChange() {
  console.log('slide change');
}

ngOnInit(): void {
  this.getData();
  this._bnNg.startWatching(1200).subscribe((isTimedOut: boolean)=>{
    if(isTimedOut){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Se cerrara la sesión por inactividad',
      })
      location.href = 'expobascula';
      this._bnNg.stopTimer();
    }
  })
}

cerrarSesion():void{
  this._expoService.logout()
}



getData():void{
  this.identidad = localStorage.getItem('expires_at')
  this.data = JSON.parse("["+this.identidad+"]")
  this.array = this.data[0].NOMBRE
  this.newimg = this.array.FOTO.substring(0,9)
  this.newimg = 'http://vm-webpage-02:8080/sideima/' + this.newimg + 'jpg' 
  
  this._appComponent.opcion = 1
  if(!this.newimg){
    this._globalService.alertaError({message:'No se logró cargar la foto'})
  }
    
}
}
