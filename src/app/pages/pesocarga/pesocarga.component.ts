import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-pesocarga',
  templateUrl: './pesocarga.component.html',
  styleUrls: ['./pesocarga.component.scss']
})
export class PesocargaComponent implements OnInit {

  constructor(private _appComponent: AppComponent) { }

  public identidad: any;
  public data: any;
  public array: any;
  public newimg: any;

  ngOnInit(): void {
    this.getData()
  }

  getData():void{
    this.identidad = localStorage.getItem('expires_at')
    this.data = JSON.parse("["+this.identidad+"]")
    this.array = this.data[0].NOMBRE
    this.newimg = this.array.FOTO.substring(0,9)
    this.newimg = 'http://vm-webpage-02:8080/sideima/' + this.newimg + 'jpg' 
    this._appComponent.opcion = 1
  }
}
