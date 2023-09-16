import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-pase-vehicular',
  templateUrl: './pase-vehicular.component.html',
  styleUrls: ['./pase-vehicular.component.scss']
})
export class PaseVehicularComponent implements OnInit {

  public identidad;
  public data;
  public array;
  public newimg;
  public linagen;

  constructor(private _appComponent: AppComponent) { }

  ngOnInit(): void {
    this._appComponent.opcion = 1;
    this.getData();
  }

  getData():void{
    this.identidad = localStorage.getItem('expires_at')
    this.data = JSON.parse("["+this.identidad+"]")
    this.array = this.data[0].NOMBRE
    this.newimg = this.array.FOTO.substring(0,9)
    this.newimg = 'http://vm-webpage-02:8080/sideima/' + this.newimg + 'jpg'
    this.linagen = this.array.ID_LINAGEN
  }

}
