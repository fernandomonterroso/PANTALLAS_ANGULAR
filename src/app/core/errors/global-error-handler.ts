import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { throwError } from 'rxjs';
import { GlobalService } from 'src/app/shared/services/global.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private _GlobalService: GlobalService,
    private zone: NgZone
  ) {}
  sss: any;
  handleError(error: HttpErrorResponse) {
    //console.log(error);
    
    let errorMessage = '';
    // Check if it's an error from an HTTP response
    try {
    
    if (!(error instanceof HttpErrorResponse)) {
      error = error//.rejection; // get the error object
    }

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      

      this.zone.run(() => {
        this._GlobalService.alertaErrorDefault('An error occurred: '+error.error);
      });

    }else 
    if(this._GlobalService.isJson(error.error)){
      this.zone.run(() => {
        this._GlobalService.alertaErrorDefault(Object.values(error.error).toString());
      });
      
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this._GlobalService.alertaErrorDefault(
        `Backend returned code ${error}, body was: `);
    }
    // Return an observable with a user-facing error message.
  } catch (errorCat) {
    console.log(errorCat);
  }
    /*
    this.zone.run(() =>
        {
        error?.message || 'Undefined client error';
        console.log(error?.error);
      }
    );
      */
    //console.error('Error from global error handler', error);
    /*
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    */
  }
}
