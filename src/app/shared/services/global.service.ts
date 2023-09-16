import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { DialogComponent } from '../components/modals/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  isLoading$ = new Subject<boolean>();

  private configSuccess: MatSnackBarConfig = {
    horizontalPosition: 'end',
      verticalPosition: 'top',
      //duration: tiempo,
      panelClass: ['style-error']  
  };

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  showLoad():void{
    this.isLoading$.next(true);
    
    //console.log(this.isLoading$);
  };

  hideLoad():void{
    this.isLoading$.next(false);
  };

  alertaSuccess({mensaje, tiempo = 3000,boton="ok"}: any){
    return this._snackBar.open(mensaje, boton,{horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: tiempo,
    panelClass: ['alerta-success'] });
  }

  alertaError({mensaje, tiempo = 3000,boton="ok"}: any){
    return this._snackBar.open(mensaje, boton,{horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: tiempo,
    panelClass: ['alerta-error'] });
  }

  alertaErrorDefault(mensaje: string, tiempo = 3000,boton="ok"){
    return this._snackBar.open(mensaje, boton,{horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: tiempo,
    panelClass: ['alerta-error'] });
  }

  isJson(item: any) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}


  private opened = false;
  openDialog(message: string, status?: number): void {
    if (!this.opened) {
      this.opened = true;

      const dialogRef = this.dialog.open(DialogComponent, {
        data: { message, status },
        maxHeight: '100%',
        width: '540px',
        maxWidth: '100%',
        disableClose: true,
        hasBackdrop: true,
      });

      dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      });
    }
  }

}
