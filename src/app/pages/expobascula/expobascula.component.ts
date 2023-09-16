import { Component, OnInit, Input } from '@angular/core';
import { Gafete } from 'src/app/models/gafete';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ExpoService } from 'src/app/shared/services/expo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expobascula',
  templateUrl: './expobascula.component.html',
  styleUrls: ['./expobascula.component.scss']
})
export class ExpobasculaComponent implements OnInit {
  @Input()

  public gafeteModel!: Gafete;
  public gafete: any="";
  public prueba: any;
  public identidad;

  constructor(private _GlobalService: GlobalService, private _expoService: ExpoService) {
    this.gafeteModel= new Gafete("","","","","","","","","","","","","");
   }


  ngOnInit(): void {
    this.configuracion();
  }

  configuracion(){
    const bascJson = localStorage.getItem('config_basc');
    if (bascJson == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Configure el sitio para poder utilizar el auto servicio',
        footer: '<a href="/home">Desea configurarlo?</a>'
      })
    }
  }

  aprobacion(): void{
    //this.gafeteModel.GAF_GAFETE= this.gafete;
    if (this.gafete == ""){
      this._GlobalService.alertaError({mensaje:"Ingrese el numero de gafete!"});
    }else if(this.gafete.length < 8){
      this._GlobalService.alertaError({ mensaje:"Gafete Invalido!"});
    }else{ 
      this._expoService.getData({"gafete": this.gafete, "puerta": 'E'}).subscribe(
        async response =>{
          this.gafeteModel = response.data;
          this._expoService.setSession(response)
          this._GlobalService.alertaSuccess({ mensaje: "Bienvenido !"})
          location.href = 'expobascula/mainExpo';
          
        }
      )
    }
  }
  

}

