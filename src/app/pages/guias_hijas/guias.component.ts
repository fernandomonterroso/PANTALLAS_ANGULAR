import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guias',
  templateUrl: './guias.component.html',
  styleUrls: ['./guias.component.scss']
})
export class GuiasComponent implements OnInit {

  public identidad: any;
  public data: any;
  public array: any;
  public newimg: any;
  
  constructor() { }

  ngOnInit(): void {
    this.getData();
  }


  getData():void{
    this.identidad = localStorage.getItem('expires_at')
    this.data = JSON.parse("["+this.identidad+"]")
    this.array = this.data[0].NOMBRE
    this.newimg = this.array.FOTO.substring(0,9)
    this.newimg = 'http://vm-webpage-02:8080/sideima/' + this.newimg + 'jpg' 
    console.log(this.newimg);
  }
}
