import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Molinete } from 'src/app/models/molinete';
import { DialogData } from 'src/app/shared/interfaces/dialog-data';
import { GafeteService } from 'src/app/shared/services/gafete.service';
import { GlobalService } from 'src/app/shared/services/global.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public receptorList!: any[];
  public nameEquipo:any;

  constructor(private _molineteService: GafeteService,
    private _GlobalService: GlobalService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
    this.getListMolinetes();
  }

  getListMolinetes(){
    this._molineteService.getMolinetesService().then(response => {
      this.receptorList = response.info;
    })
    
  }

  getListMolinetes2(){
    this._molineteService.getMolinetesService2().subscribe(
      response=>{
        this.receptorList = response.info;
      },
      error=>{
        var errorMessage = <any>error;
        this._GlobalService.alertaError({mensaje:errorMessage});
      }
    )
    
    
  }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
