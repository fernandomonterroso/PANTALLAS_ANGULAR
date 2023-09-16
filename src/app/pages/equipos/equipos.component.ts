import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { AppComponent } from 'src/app/app.component';
import { ExpoService } from 'src/app/shared/services/expo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit {

  public identidad;
  public data;
  public array;
  public cod_empresa;
  public newimg;
  public linagen;
  public hoy = new Date();
  public fecha_anio = this.hoy.getUTCFullYear();
  public fecha_mes = this.hoy.getUTCMonth() + 1;
  public fecha_dia = this.hoy.getUTCDate();
  public taraModel;
  public taraSelected: any;
  public updTara: any;
  public basculaModel: any;
  public bascSelc:string = '0';
  public selc
  public taraselc
  public getEndpoint: any
  public getEndpointUpd: any
  public numEquip: any
  public linagenAge : any
  public peso = 0
  public agregarModel: any
  public newpeso: any
  public taraCorr: any
  public nombre: any
  public opcionEdit = 0;
  public optEdit = false;
  public dateFormat = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Guatemala",
    timeZoneName: "long"
  });

  // EDITAR //

  public modelbascedit: string = '0';

  public edit = {
    equipo:'',
    tipo:'',
    peso:'',
    id:'',
    bascula: ''
  }

  
  public FechaHoy = this.fecha_dia + "/" +this.fecha_mes + "/" +  this.fecha_anio;

  public equiposModel!: any[]


  constructor(private _appComponent: AppComponent, private _exporService: ExpoService, private _datePipe: DatePipe, private _bnNg: BnNgIdleService) { }

  ngOnInit(): void {
    this._appComponent.opcion = 1;
    this.getData();
    this.getEquipos();
    this.getTara();
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


  // Obtine información del usuario por medio de token
  getData():void{
    this.identidad = localStorage.getItem('expires_at')
    this.data = JSON.parse("["+this.identidad+"]")
    this.array = this.data[0].NOMBRE
    this.newimg = this.array.FOTO.substring(0,9)
    this.newimg = 'http://vm-webpage-02:8080/sideima/' + this.newimg + 'jpg'
    this.linagen = this.array.EMPRESA
  }


  // Mostrar en la tabla
  getEquipos():void{
    if(this.array.ID_LINAGEN != '12730'){
      this._exporService.getTarasAsigandas(this.linagen, this.FechaHoy).subscribe(
        res=>{
          this.equiposModel = res.data;
          this.equiposModel.forEach(element => {
            element.TARA_FECH = this._datePipe.transform(element.TARA_FECH, 'hh:mm a', '+0000')
          });
        }
      )
    }else{
      this._exporService.getAllTaras(this.FechaHoy).subscribe(
        res=>{
          this.equiposModel = res.data;
          this.equiposModel.forEach(element => {
            element.TARA_FECH = this._datePipe.transform(element.TARA_FECH, 'hh:mm a', '+0000')
          });
        }
      )
    }
  }

// Obienen información al seleccionar
  getTara():void{
    this._exporService.getTaras2().subscribe(
      res=>{
        this.taraModel = res.data
      }
    )
  }

  capturarTaraIns(){
    this.taraSelected = this.selc
    console.log(this.taraSelected.TBASE_COD);
  }

  capturarTaraUpd(){
    this.updTara = this.taraselc
    this.edit.tipo = this.updTara.TBASE_COD
    //console.log(this.edit.tipo);
  }

  capturarEndIns(){
    this.getEndpoint = this.bascSelc;
  }

  capturarEndUpd(){
    this.getEndpointUpd = this.modelbascedit;
    this._exporService.getPeso(this.getEndpointUpd.BAS_ENDPOINT).subscribe(
      res=>{
        this.edit.peso = res.peso.toString().substring(0,5);
        console.log(res.peso);
        console.log(this.edit.peso);
        
      }
    )  
  }

  getTaraCorr(id){
    this.taraCorr = id
  }

// Listas de Modal 'agregar'
  selectTable(){
    var pesoApi = JSON.parse(localStorage.getItem('config_basc') || '{}') ;
    if(this.taraSelected == null && this.numEquip == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Porfavor! ingrese los datos solicitados',
      })
    }else if(this.taraSelected == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Porfavor! seleccione un tipo de tara',
      })
    }else if(this.numEquip == ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Porfavor! ingrese el numero de equipo',
      })
    }else{
      this._exporService.getPesosApi(pesoApi.BAS_ENDPOINT).subscribe(
        resp =>{
          this.peso = resp.peso
          this.newpeso = this.peso.toString().substring(0, this.peso.toString().length -3);
          if(this.newpeso != 0){
            if(this.array.ID_LINAGEN == '12730'){
              this._exporService.insertEquipo(this.array.ID_LINAGEN, this.numEquip, this.newpeso, pesoApi.BAS_COD, this.taraSelected.TBASE_COD, '1')
              .subscribe(
                res=>{
                  this.agregarModel = res;
                  this.getEquipos();
                  this.numEquip = ""
                  this.getEndpoint = null
                  this.taraSelected = null
                }
              )
            }else{
              this._exporService.insertEquipo(this.array.ID_LINAGEN, this.numEquip, this.newpeso, pesoApi.BAS_COD, this.taraSelected.TBASE_COD, '2')
              .subscribe(
                res=>{
                  this.agregarModel = res;
                  this.getEquipos();
                  this.numEquip = ""
                  this.getEndpoint = null
                  this.taraSelected = null
                  //this.equiposModel.push(this.agregarModel)
                }
              )
            }
          }else{
            Swal.fire({
              icon: 'error',
              title: 'ERROR EN PESAJE',
              text: 'El peso de la tara no puede ser de 0',
            })
          } 
        }
      )
    }
  }

// Opción cancelar de los modal

  cancelar(){
    this.optEdit = false
  }
  
  cancelSelect(){
    this.numEquip = ""
    this.getEndpoint = null
    this.taraSelected = null
    this.optEdit = false
  }
// CRUD de la pagina
  editarPeso(): any{
    //this.opcionEdit = 1;
    //this.optEdit=true;
    var pesoApi = JSON.parse(localStorage.getItem('config_basc') || '{}') ;
    if(!pesoApi?.BAS_ENDPOINT){
      return Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Equipo desconfigurado para enpoint de bascula',
      });
    }
    this._exporService.getPesosApi(pesoApi.BAS_ENDPOINT).subscribe(
      (resp): any =>{
        resp.peso = parseFloat(resp.peso);
        if(resp.peso<=0){
          return Swal.fire({
            icon: 'warning',
            title: 'Aviso',
            text: 'El peso de la tara no puede ser igual o menor a 0.',
          })
        }
        this.edit.peso = resp.peso; 
      }
    )
  }

  updateEquipo(){
    console.log(this.edit);
    this._exporService.updateEquipo(this.edit).subscribe(
      resp =>{     
        this.optEdit = false
        this.getEquipos()
      }
    )
  }


  


  async editTaraCorr(id, tipo, num, peso, bascula){

    this.edit.id =id.toString();
    this.edit.peso=peso.toString();
    this.edit.equipo = num.toString();
    this.edit.tipo = tipo.toString();
    this.edit.bascula = bascula.toString();
  }

  deleteEquipo(){
    this._exporService.deleteEquipo(this.taraCorr).subscribe(
      res=>{ 
        this.getEquipos()
      }
    );
  }

}
