import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Observable, Subject } from 'rxjs';
import { Gafete } from 'src/app/models/gafete';
import { Molinete } from 'src/app/models/molinete';
import { TipoAcceso } from 'src/app/models/tipo-acceso';
import { GafeteService } from 'src/app/shared/services/gafete.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { MolineteService } from 'src/app/shared/services/molinete.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.scss']
})
export class AccesoComponent implements OnInit {
  public molinete!: Molinete;
  public TipoAcceso! : TipoAcceso;
  public vocesList: any;
  public voicesSelected: any;
  color: ThemePalette = 'primary';
  checkedVoz = false;
  checkedUltimaEntrada = false;
  public resAcceso=false;
  public gafeteModel!: Gafete;
  public status: any;
  public ayuda=0;
  public interval: any;
  public statusMoli={
    estado:false,
    error:""
  };
  public statusPuerta="Esperando evento...";
  public   gafete: any="";
  public   puerta: any="";
  public counter: any;


  constructor(private _GlobalService: GlobalService,
    private _gafeteService: GafeteService,
    private _molineteService: MolineteService,) { 
      this.TipoAcceso = new TipoAcceso(0,"");
      this.gafeteModel= new Gafete("","","","","","","","","","","","","");
    }

  ngOnInit(): void {
    this.configuracion();
    //this.TipoAcceso.tipo=0;
  }
  
  ngOnDestroy() {
    clearInterval(this.interval);
  }


  async marcaje(){
    this.puerta = this.gafete.substring(0, 1).toUpperCase();
    this.gafete = this.gafete.replace("'","-").substring(1, this.gafete.length);
    
    //ARTICULOS    
    //console.log("ARTICULOS",this.gafete.search(/^[0-9]{2}[A][0-9]{5}$/) !== -1);
    //PERSONAS ALQUILADAS
    //console.log("PERSONAS",this.gafete.search(/^[0-9]{2}[P][0-9]{5}$/) !== -1);

    let valor = await this._gafeteService.ultimoEntradaService(this.checkedUltimaEntrada, this.gafete,this.molinete.MOLI_ACCESO);

    if(this.gafete==""){
      this._GlobalService.alertaError({mensaje:"ingrese el numero de gafete!"});
    }else if(this.gafete.search(/^[0-9]{2}[A][0-9]{5}$/) !== -1){
      this._GlobalService.alertaError({mensaje:"Ingreso de artículos no debe marcarse en este molinete."});
    }else if(this.gafete.search(/^[0-9]{2}[P][0-9]{5}$/) !== -1){
      this._GlobalService.alertaError({mensaje:"(Web no valido) Debe ingresar con gafete."});
    }else{
      //TIPO DE GAFETE
      

      this._gafeteService.marcajeService(
        {
          "gafete":this.gafete,
          "puerta": this.puerta
        }).subscribe(
          async response =>{
            this.gafeteModel = response.data;
            this.resAcceso = response.acceso;

            if (this.gafete.length > 5){
              this.TipoAcceso.tipo=1;
            }else{
              this.TipoAcceso.tipo=2;
            };

            if(!response.acceso){
              var error = "Gafete no tiene acceso a esta área";
              this.speek(error);
              this.gafeteModel.ALERTA=error;
              this.quitarImagen();
            }else if(valor.info==false){
              this.resAcceso=false;
              var error = "El acceso es el mismo que su ultimo registro, marque puerta contraria.";
              this.gafeteModel.ALERTA=error;
              this.speek(error);
              this.quitarImagen();
            }else{
              this.accionMoli();
              this.speek("Abriendo puerta a "+response.data.NOMBRE);
              this.quitarImagen();
            }
          }
          ,error =>{
            this._GlobalService.alertaError({mensaje:error});
            this.TipoAcceso.tipo=100;
            this.TipoAcceso.descripcion = error;
            this.speek(error);
            this.quitarImagen();
          }
      )
      
    }
    
    
    //LIMPIAR GAFETE
    //this.gafete="";
    //document.getElementById("inputGafete").focus();
  }




  configuracion(){
    let input = document.getElementById("inputGafete");
    input?.focus(); 
    const userJson = localStorage.getItem('configuracion');
    this.molinete = userJson !== null ? JSON.parse(userJson) : new Molinete("",0,0,0,"",0,"",0,0,0,0,"");
    if(userJson ==null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Configure el sitio para poder realizar los marcajes',
        footer: '<a href="/home">Desea configurarlo?</a>'
      })
    }else{
      this.timerStatus();
    }
  }

  delay(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
  };

  getVoices() {  
    window.speechSynthesis.getVoices();
    return this.vocesList = window.speechSynthesis.getVoices();
  }

  async sayIt(text:string, config:any) {
    var voices =await this.getVoices();
    var msg = new SpeechSynthesisUtterance();
    msg.voice = config && config.voiceIndex ? voices[config.voiceIndex] : voices[0];
    msg.volume = config && config.volume ? config.volume : 1;
    msg.rate = config && config.rate ? config.rate : 1;
    msg.pitch = config && config.pitch ? config.pitch : 1;

    //message for speech
    msg.text = text;

    speechSynthesis.speak(msg);
}

  speek(decir: string){
    if (this.checkedVoz) {
      let config = {
        pitch: 1,
        rate: 1,
        voiceIndex: this.voicesSelected,
        volume: 1
      };
      if(window.speechSynthesis) {
        this.sayIt(decir, config);
      }
    }
  }


  async timerStatus(){
    let tiempo: number=await this.statusMolinete();
    var a = 1;
    this.interval = setInterval(() => {
      a++;
      var segundos = a*1000;
      if(segundos > tiempo){
        clearInterval(this.interval);
        this.timerStatus();
      }
    }, 1000);
    
  }

  async accionMoli(){
    this.statusPuerta="Cargando...";
    //this.molinete = Objeto.find(c => c.MOLI_ACCESO == "X");

    let userJson = localStorage.getItem('molinetes');
    this.molinete = userJson !== null ? JSON.parse(userJson).find(c => c.MOLI_ACCESO == this.puerta) : new Molinete("",0,0,0,"",0,"",0,0,0,0,"");

    //this.molinete.

    if( this.molinete === undefined || this.molinete === null){
      window.location.reload();
    }

    console.log(this.molinete);
    this._molineteService.accionesMolinete(this.molinete)
    .subscribe(async response=>{
          this.statusPuerta = response.estado;
          this.quitarImagen();
        
      },
      error=>{
        var errorMessage = <any>error;
        this.statusPuerta=errorMessage;
      }
    )
  }

  async quitarImagen(){
    this.gafete="";
    
    //console.log(formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss', 'en'));
    await this.delay(this.molinete.MOLI_TIEMPO_MOSTRAR);
    let input = document.getElementById("inputGafete");
    input?.focus();
    this.gafeteModel= new Gafete("","","","","","","","","","","","","");
    this.statusPuerta="Esperando evento";
    //console.log(formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss', 'en'));
    this.TipoAcceso.tipo=0;
  }

  statusMolinete():Promise<number>{
      //var subject = new Subject<any>();
      this.statusMoli.error="";
      return new Promise((resolve, reject) => {
        this._molineteService.getStatus(this.molinete.MOLI_IP_MOLINETE)
        .subscribe(
          response=>{
              this.statusMoli.estado = response.estado;
              //subject.next(this.molinete.MOLI_TIEMPO_ESPERA);
              resolve(this.molinete.MOLI_TIEMPO_ESPERA);
          },
          error=>{
            var errorMessage = <any>error;
            this.statusMoli.error = errorMessage;
            //console.log(this.statusMoli.error);
            resolve(this.molinete.MOLI_TIEMPO_ERROR);
          }
        )
      })
      //return subject.asObservable();
    }

}
