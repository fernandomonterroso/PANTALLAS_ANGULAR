import { Component, OnInit } from '@angular/core';
import { ExpoService } from 'src/app/shared/services/expo.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { AppComponent } from 'src/app/app.component';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { BnNgIdleService } from 'bn-ng-idle';


@Component({
  selector: 'app-bascula',
  templateUrl: './bascula.component.html',
  styleUrls: ['./bascula.component.scss']
})

export class BasculaComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public basculaModel: any;
  public pesoInsert: any;
  public loading = true;
  public equipoSelc: string = '0';
  public guiasModel!: any[];
  public historyModel!: any[];
  public guiasHijasModel!: any[];
  public searchModel = '';
  public hoy = new Date();
  public fecha_anio = this.hoy.getUTCFullYear();
  public fecha_mes = this.hoy.getUTCMonth() + 1;
  public fecha_dia = this.hoy.getUTCDate();
  public mesFinal: any;
  public diaFinal: any;
  public fechaIni = document.getElementById("FechaIn");
  public fechaSal = document.getElementById("FechaSal");
  public identidad;
  public data;
  public array;
  public horas: any;
  public newimg;
  public pipe: any;
  public getEndpoint: any;
  public getEquip: any
  public peso: any;
  public numGuia: any;
  public numPiezas: any;
  public equiposModel!: any[]
  public linagen: any
  public taraPeso: any;
  public pesoNeto: any;
  public pesoBruto: any;
  public noGuia: any;
  public fecha: any;
  public mensaje = false;
  public basCod: any;
  public guardarJson: any;
  public detalleJson: any;
  public pesoApi = JSON.parse(localStorage.getItem('config_basc') || '{}');
  public brutoLb: any;
  public resultado: any;
  capBasc = false;
  capEquip = false;
  panel1 = false;
  panel2 = false;
  panel3 = false;
  totalPiezas: number = 0;
  totalTara: number = 0;
  totalPesoBruto: number = 0;
  totalPesoNeto: number = 0;


  // JSON para basculaComponent.php de desarrollo/produccion
  guardarPesos = {
    GUIA_CORR: 0,
    GUIA_ANIO: 0,
    TIPOGUIA_COD: 'CGE',
    PESO_CORR: 1,
    PESO_CORREQUIPO: 0,
    PESO_BRUTO: 0,
    PESO_FECHOR: '',
    PESO_CFRIO: 'N',
    PESO_USOBASCULA: 'S',
    BAS_BODEGA: 'E',
    BAS_COD: 0,
    PESO_BRUTOKG: 0,
    PESO_TARAKG: 0,
    PESO_TARAMAN: 0,
    PESO_TARAMANKG: 0,
    COBRO_ENCAJA: 'N',
    PESO_ANIOCOD: 0,
    PESO_CODIGO: 0,
    GUIA_PIEZACF: 0,
    PESO_CANTPIEZA: 0,
    RepesoFlag: 'false'
    , TBASE_COD: ''
    , PESO_NUMEQUIPO: ''
  }

  pesoDeta = {
    DETPESO_CORR: 0,
    DETPESO_ANIOREP: 0,
    DETPESO_CODREP: 0,
    GUIA_CORR: 0,
    GUIA_ANIO: 0,
    TIPOGUIA_COD: 'CGE',
    DETPESO_BASCULA: "",
    DETPESO_TARA: 0,
    DETPESO_PESOBRUTO: 0,
    DETPESO_PESOBRUTOKG: 0,
    DETPESO_BASCULALB: ""
  }

  public raw = {
    INFO: this.guardarPesos,
    PESOS: this.pesoDeta
  }

  // --------------------------------------------------------------------------

  constructor(
    private _expoService: ExpoService,
    private _GlobalService: GlobalService,
    private _appComoponent: AppComponent,
    private pd: DatePipe,
    private _bnNg: BnNgIdleService
  ) { }

  public FechaIni = this.fecha_dia + "/" + this.fecha_mes + "/" + this.fecha_anio;
  public FechaFin = this.fecha_dia + "/" + this.fecha_mes + "/" + this.fecha_anio;


  ngOnInit(): void {

    this.getData();

    this.getEquipos();

    if (!this.getGuias) {
      this._GlobalService.alertaError({ message: 'No se lograron cargar las guias' })
    }

    this._bnNg.startWatching(1200).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Se cerrara la sesión por inactividad',
        })
        location.href = 'expobascula';
        this._bnNg.stopTimer();
      }
    })

    this.guiasDefault();


  }

  cancelSelect() {
    this.numPiezas = 0
    this.numGuia = ""
    this.pesoInsert = ""
    this.getEndpoint = null
    this.equipoSelc = ""
  }

  // Gets generales de la pagina
  getData(): void {
    this.identidad = localStorage.getItem('expires_at')
    this.data = JSON.parse("[" + this.identidad + "]")
    this.array = this.data[0].NOMBRE
    this.newimg = this.array.FOTO.substring(0, 9)
    this.newimg = 'http://vm-webpage-02:8080/sideima/' + this.newimg + 'jpg'
    this.linagen = this.array.ID_LINAGEN
    this._appComoponent.opcion = 1
    console.log(this.newimg);
  }

  getFechas() {
    if (this.range.value.start != null && this.range.value.start != null) {
      let fechaInicial = this.pd.transform(this.range.controls.start.value, 'dd-MM-yyyy')
      let fechaFinal = this.pd.transform(this.range.controls.end.value, 'dd-MM-yyyy')
      this.FechaIni = fechaInicial || '';
      this.FechaFin = fechaFinal || '';
      this.getGuias();

    } else if (this.range.value.start == null && this.range.value.start == null) {
      console.log('entre');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Porfavor! seleccione un rango de fecha para aplicarlo',
      })
    }
  }


  getGuiasHijas() {
    this._expoService.getGuia(this.array.ID_LINAGEN, this.FechaIni, this.FechaFin).subscribe(
      res => {
        this.guiasModel = res.data
        this.guiasModel.forEach(element => {
          //console.log(element.GUIA); 
          this._expoService.getGuiasHijas(element.GUIA).subscribe(
            resultado => {
              this.guiasHijasModel = resultado.data
              //console.log(this.guiasHijasModel);
            }
          )
        });
      }
    )
  }

  getGuias(): void {
    if (this.array.ID_LINAGEN != '12730') {
      this._expoService.getGuia(this.array.ID_LINAGEN, this.FechaIni, this.FechaFin).subscribe(
      //this._expoService.getGuiaAll(this.FechaIni, this.FechaFin).subscribe(
        async res => {
          this.guiasModel = res.data;
          this.guiasModel.forEach(element => {
            this.fecha = element.FECHA_INI = this.pd.transform(element.FECHA_INI, 'yyyy/MM/dd')
            element.FECHA_INI = this.pd.transform(element.FECHA_INI, 'yyyy/MM/dd')
            this.horas = this.pd.transform(element.FECHA_INI, 'hh:mm a', '+0000')
            if (this.pesoInsert == null && this.pesoNeto == null) {
              this.pesoBruto = '- -'
              this.pesoNeto = '- -'
            }
          });
        },
      )
    } else {
      this._expoService.getGuiaAll(this.FechaIni, this.FechaFin).subscribe(
        async res => {
          this.guiasModel = res.data;
          this.guiasModel.forEach(element => {
            this.fecha = element.FECHA_INI = this.pd.transform(element.FECHA_INI, 'yyyy/MM/dd')
            element.FECHA_INI = this.pd.transform(element.FECHA_INI, 'yyyy/MM/dd')
            this.horas = this.pd.transform(element.FECHA_INI, 'hh:mm a', '+0000')
            if (this.pesoInsert == null && this.pesoNeto == null) {
              this.pesoBruto = '- -'
              this.pesoNeto = '- -'
            } else {
              element.FECHA_SAL = this.pd.transform(element.FECHA_SAL, 'yyyy/MM/dd')
            }
          });
        },
      )
    }
  }

  getEquipos(): void {
    if (this.array.ID_LINAGEN != '12730') {
      this._expoService.getTarasAsigandas(this.array.EMPRESA, this.FechaIni).subscribe(
        res => {
          this.equiposModel = res.data;
          if (this.equiposModel.length == 0) {
            this.mensaje = true
          } else {
            this.equiposModel.forEach(element => {
              this.taraPeso = Number(element.TARA_PESOKG);
              element.TARA_FECH = this.pd.transform(element.TARA_FECH, 'hh:mm a', '+0000')
            });
          }
        }
      )
    } else {
      this._expoService.getAllTaras(this.FechaIni).subscribe(
        res => {
          this.equiposModel = res.data;
          if (this.equiposModel.length == 0) {
            this.mensaje = true
          } else {
            this.equiposModel.forEach(element => {
              this.taraPeso = Number(element.TARA_PESOKG);
              element.TARA_FECH = this.pd.transform(element.TARA_FECH, 'hh:mm a', '+0000')
            });
          }
        }
      )
    }
  }

  getHistory() {
    this._expoService.getHistory(this.guardarPesos.GUIA_ANIO, 1, this.guardarPesos.GUIA_CORR).subscribe(
      res => {
        this.historyModel = res.data;
        this.calculateTotals(); // Llama al método para calcular los totales
      }
    );
  }
  
  calculateTotals() {
    this.totalPiezas = this.historyModel.reduce((total, hist) => total + hist.PESO_CANTPIEZA, 0);
    this.totalTara = this.historyModel.reduce((total, hist) => total + hist.PESO_TARAMANKG, 0);
    this.totalPesoBruto = this.historyModel.reduce((total, hist) => total + hist.PESO_PESOBRUTOKG, 0);
    this.totalPesoNeto = this.historyModel.reduce((total, hist) => total + (hist.PESO_PESOBRUTOKG - hist.PESO_TARAMANKG), 0);
  }
  

  // Capturar información al interactuar con algun boton

  capturarKeys(corr, anio, tipo_guia, cia_cod, guia) {
    this._expoService.obtienepesos(this.guardarPesos).subscribe(
      res => {
        this.guardarPesos.GUIA_ANIO = anio
        this.guardarPesos.TIPOGUIA_COD = tipo_guia
        this.guardarPesos.PESO_CORR = 1
        this.guardarPesos.GUIA_CORR = corr
        this.guardarPesos.PESO_CORR = res.informacion.PARAMETRO == 0 ? res.informacion.CORRELATIVO : res.informacion.PARAMETRO;
        this.guardarPesos.PESO_ANIOCOD = res.informacion.PESO_ANIOCOD;
        this.guardarPesos.PESO_CODIGO = res.informacion.PESO_CODIGO;
        this.guardarPesos.BAS_BODEGA = 'E';
        this.guardarPesos.PESO_FECHOR = this.fecha

        this.pesoDeta.DETPESO_CORR = 1
        this.pesoDeta.GUIA_CORR = corr
        this.pesoDeta.GUIA_ANIO = anio
        this.pesoDeta.DETPESO_ANIOREP = res.informacion.PESO_ANIOCOD;
        this.pesoDeta.DETPESO_CORR = res.informacion.PARAMETRO == 0 ? res.informacion.CORRELATIVO : res.informacion.PARAMETRO;

        console.log(this.guardarPesos);

      }
    )
    this.noGuia = guia
  }

  capturarKeysHistory(corr, anio, tipo_guia, cia_cod, num_guia) {
    this.guardarPesos.GUIA_ANIO = anio
    this.guardarPesos.GUIA_CORR = corr
    this.getHistory()
    this.noGuia = num_guia
  }

  

  capturarEquipo() {
    this.getEquip = this.equipoSelc;
    this.taraPeso = this.getEquip.TARA_PESOKG;
    //this.guardarPesos.PESO_TARAKG = this.taraPeso
    this.guardarPesos.PESO_TARAMANKG = this.taraPeso
    this.pesoDeta.DETPESO_TARA = this.taraPeso
    this.capEquip = true
    if(this.getEquip == "equipoNulo"){
      this.guardarPesos.PESO_TARAMANKG = 0;
      this.pesoDeta.DETPESO_TARA = 0;
    }
    console.log(this.getEquip)
  }


  // Función de pesar con sus validaciones
  pesarCarga(): any {
    var pesoApi = JSON.parse(localStorage.getItem('config_basc') || '{}');
    if (!pesoApi?.BAS_ENDPOINT) {
      return Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Equipo desconfigurado para enpoint de bascula',
      });
    }
    this._expoService.getPesosApi(pesoApi.BAS_ENDPOINT).subscribe(
      res => {
        this.peso = parseFloat(res.peso).toFixed(2);
        this.pesoBruto = this.peso;
        console.log("CIERRE", this.taraPeso, this.pesoBruto);
        if (this.equipoSelc == null) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Porfavor! seleccione un equipo',
          })
        } else if (this.taraPeso >= this.pesoBruto) {
          this._GlobalService.alertaError({ mensaje: "Peso de tará no puede ser mayor o igual al peso bruto" })
          this.pesoBruto = '- -'
          this.cancelSelect();
        } else if (this.pesoNeto == 0) {
          this._GlobalService.alertaError({ mensaje: "El peso neto debe ser mayor a 0" })
          this.pesoBruto = '- -'
          this.cancelSelect();
        } else if (this.numPiezas == null || this.capEquip == false) {
          this._GlobalService.alertaError({ mensaje: 'Debe ingresar todos los datos solicictados al pesar' })
          this.pesoBruto = '- -'
          this.cancelSelect();
        } else {
          this.pesoNeto = this.pesoBruto - this.taraPeso;
          this.guardarPesos.PESO_BRUTOKG = this.pesoBruto;
          this.guardarPesos.PESO_BRUTO = Number((this.guardarPesos.PESO_BRUTOKG * 2.205).toFixed(2));
          console.log(this.guardarPesos.PESO_BRUTOKG);
          console.log(this.guardarPesos.PESO_BRUTO);
          this.guardarPesos.PESO_CANTPIEZA = this.numPiezas;
          this.guardarPesos.BAS_COD = this.pesoApi.BAS_COD;

          // DATOS DE pesoDeta
          this.pesoDeta.DETPESO_PESOBRUTOKG = this.pesoBruto;
          this.pesoDeta.DETPESO_PESOBRUTO = Number((this.pesoDeta.DETPESO_PESOBRUTOKG * 2.205).toFixed(2));

          this.pesoDeta.DETPESO_BASCULA = this.pesoBruto;


          //Básculas cuartos Frios
          //if(pesoApi.BAS_COD == '03' || pesoApi.BAS_COD == '05'){
          this.guardarPesos.PESO_CFRIO = 'S'

          //}

          // Convertir de kg a lb
          this.brutoLb = parseFloat(this.pesoBruto).toFixed(2);
          var multiplicacion = this.peso
          this.resultado = this.brutoLb * 2.205;
          this.pesoDeta.DETPESO_BASCULALB = parseFloat(this.resultado).toFixed(2);
          this.guardarPesos.TBASE_COD = this.getEquip.TBASE_COD;
          this.guardarPesos.PESO_NUMEQUIPO = this.getEquip.TARA_CODEQUIPO;
          this.guardarJson = JSON.stringify(this.guardarPesos)
          this.detalleJson = JSON.stringify(this.pesoDeta)

          this._expoService.insertPesos(this.guardarPesos, this.pesoDeta).subscribe(
            res => {
              // this.guiasModel.forEach(element =>{
              //   element.PESO_NETO = this.pesoNeto
              //   element.PESO_BRUTO = this.pesoBruto

              // })
              this.cancelSelect()
              this.getGuias()
            }
          )

        }
      }
    );
  }

  guiasDefault() {
    this.FechaIni = this.fecha_dia + "/" + this.fecha_mes + "/" + this.fecha_anio;
    this.FechaFin = this.fecha_dia + "/" + this.fecha_mes + "/" + this.fecha_anio;
    this.getGuias()
  }

  // Quitar el filtro
  removeFilter() {
    this.range.controls.start.reset()
    this.range.controls.end.reset()
    this.FechaIni = this.fecha_dia + "/" + this.fecha_mes + "/" + this.fecha_anio;
    this.FechaFin = this.fecha_dia + "/" + this.fecha_mes + "/" + this.fecha_anio;
    this.searchModel = '';
    this.getGuias()
  }
}
