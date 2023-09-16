import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/modals/dialog/dialog.component';
import { configEquipoComponent } from 'src/app/shared/components/modals/configEquipo/configEquipo.component';
import { DialogData } from 'src/app/shared/interfaces/dialog-data';
import { ExpoService } from 'src/app/shared/services/expo.service';
import { GafeteService } from 'src/app/shared/services/gafete.service';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public receptorList!: any[];
  public models!: DialogData;

  constructor(private _molineteService: GafeteService,
    private _expoService: ExpoService,
    private _GlobalService: GlobalService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
   //this.hola();
  }

  hola():void{
    this._molineteService.getMolinetesService().then(response => {
      this.receptorList = response.info;
    })
    /*
    .subscribe(
      response=>{
        this.receptorList = response.info;
      },
      error=>{
        var errorMessage = <any>error;
        this._GlobalService.alertaError({mensaje:errorMessage});
      }
    )
    */
    
  
  }

  openDialog(): void {
    //this._GlobalService.hideLoad();
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '35%',
      panelClass: 'centrar',
      backdropClass:'fondo',
      data: {info: {nombre: ""},
              molinete: 
              {MOLI_IP_MOLINETE: "",
              MOLI_PUERTO: "",
              MOLI_TIEMPO: "",
              MOLI_DIRECCION: "",
              MOLI_ACCESO: ""}
            }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        console.log(JSON.stringify(result));
        this.configurar(result);
      }
      
    });
  }

  bascList(): void {
    //this._GlobalService.hideLoad();
    const dialogRef = this.matDialog.open(configEquipoComponent, {
      width: '35%',
      panelClass: 'centrar',
      backdropClass:'fondo',
      data: {info: {nombre: ""},
              bascula: 
              {CIA_COD: "",
                BAS_ENDPOINT: "",
                BAS_COD: "",
                BAS_BODEGA: ""}
            }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        //console.log(JSON.stringify(result));
        this.configurarBasc(result);
      }
      
    });
  }

  configurar(objeto: any){
    //console.log(JSON.stringify(objeto.molinete));
    if(objeto.molinete.MOLI_IP_MOLINETE==""){
      this._GlobalService.alertaError({mensaje:"Ingrese el nombre del equipo"});
    }else{
      this._molineteService.getParamsMolinete(objeto.molinete.MOLI_IP).subscribe(
        response=>{
          if(response.info){
            localStorage.setItem('configuracion', JSON.stringify(response.info));
            this._GlobalService.alertaSuccess({mensaje:"Se configuro el sitio."});
          }else{
            this._GlobalService.alertaError({mensaje:"Parametros no acetables!"});
          };
        },
        error=>{
          var errorMessage = <any>error;
          this._GlobalService.alertaError({mensaje:errorMessage});
          throw error;
        }
      )

      this._molineteService.getParamsAllMolinetes().subscribe(
        response=>{
          if(response.info){

            let moliParams = response.info;
            //moliParams.MOLI_IP_MOLINETE = objeto.molinete.MOLI_IP_MOLINETE;
            moliParams.forEach(function(record) {
                  record.MOLI_IP_MOLINETE =  objeto.molinete.MOLI_IP_MOLINETE;
          });
            localStorage.setItem('molinetes', JSON.stringify(moliParams));
            /*
            localStorage.setItem('molinetes', JSON.stringify(response.info));
            let moliParams = response.info;
            //moliParams.MOLI_IP_MOLINETE = objeto.molinete.MOLI_IP_MOLINETE;
            moliParams.forEach(function(record) {
                  record.MOLI_IP_MOLINETE =  objeto.molinete.MOLI_IP_MOLINETE;
          });
            localStorage.setItem('molinetes', JSON.stringify(moliParams));
          */
          }
        },
        error=>{
          var errorMessage = <any>error;
          this._GlobalService.alertaError({mensaje:errorMessage});
          throw error;
        }
      )

    }
  }

  configurarBasc(cod: any){
    //console.log(JSON.stringify(objeto.molinete));
    if(cod.bascula.BAS_ENDPOINT==""){
      this._GlobalService.alertaError({mensaje:"Ingrese el nombre del equipo"});
    }else{
      this._expoService.getBasculasEnd(cod.bascula.BAS_COD).subscribe(
        response=>{
          if(response.info){
            localStorage.setItem('config_basc', JSON.stringify(response.info));
            this._GlobalService.alertaSuccess({mensaje:"Se configuro el sitio."});
          }else{
            this._GlobalService.alertaError({mensaje:"Parametros no acetables!"});
          };
        },
        error=>{
          var errorMessage = <any>error;
          this._GlobalService.alertaError({mensaje:errorMessage});
          throw error;
        }
      )
    }
  }
}
