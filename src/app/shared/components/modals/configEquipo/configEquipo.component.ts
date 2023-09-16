import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Molinete } from 'src/app/models/molinete';
import { BasculaData } from 'src/app/shared/interfaces/basc-data';
import { ExpoService } from 'src/app/shared/services/expo.service';
import { GlobalService } from 'src/app/shared/services/global.service';


@Component({
  selector: 'app-configEquipo',
  templateUrl: './configEquipo.component.html',
  styleUrls: ['./configEquipo.component.scss']
})
export class configEquipoComponent implements OnInit {
  public nameEquipo:any;
  public basculaModel: any;

  constructor(private _expoService: ExpoService,
    private _GlobalService: GlobalService,
    public dialogRef: MatDialogRef<configEquipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BasculaData
    ) { }

  ngOnInit(): void {
    this.getBasculas();
  }

  getBasculas(){
    this._expoService.getBasculas().subscribe(
        res=>{
            console.log(res.data);
            this.basculaModel = res.data
        }
    )   
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
