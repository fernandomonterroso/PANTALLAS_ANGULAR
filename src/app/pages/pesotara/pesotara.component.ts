import { Component, OnInit } from '@angular/core';
import { ExpoService } from 'src/app/shared/services/expo.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pesotara',
  templateUrl: './pesotara.component.html',
  styleUrls: ['./pesotara.component.scss']
})
export class PesotaraComponent implements OnInit {

  public basculaModel!: any[];
  public tarasModel!: any[];
  public codigo: any;
  public pesoPrueba: string = '55'
  bascSelec: string = '0';
  taraSelected:any;
  taraModel:any;
  linkModel:any;
  getEndPoint: any;

  constructor(
    private _expoService: ExpoService,
    private _appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getTaras()
  }


  getTaras(): void{
    this._expoService.getTaras2().subscribe(
      response=>{
        this.tarasModel = response.data;
      })
  }

  configuracion():void{
    if(this.getEndPoint == null && this.taraSelected == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Porfavor! seleccione tara y bascula',
      })
    }else
    if(this.getEndPoint == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Porfavor! seleccione una bascula',
      })
    }else if(this.taraSelected == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Porfavor! seleccione un tipo de tara',
      })
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Has Configurado Correctamente',
        text: 'Tu Tara ha pesado: - -KG',
        
      })
      this._expoService.getPeso(this.getEndPoint.BAS_ENDPOINT).subscribe(
        res =>{
          console.log(res);
          
          this.linkModel = res.data
        }
      )
      location.href = 'expobascula/pesajecarga';
    }
  }

  capturarEnd(){
    this.getEndPoint = this.bascSelec
    console.log(this.getEndPoint.BAS_ENDPOINT);
    
  }

  capturarTara(){
    this.taraSelected = this.taraModel
  }

}
