import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GafeteService {
  endpointMoli:any = environment.endpointMolinete;
  endpointApi:any = environment.endpointApiNode;
  constructor(public _http: HttpClient) { }

  ultimoEntradaService(active: boolean,gafete: string,puerta: string):Promise<any>{
    var res:any;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    //console.log("gafete",gafete);
    if(active && gafete.length > 4){
      res = this._http.get<boolean>(this.endpointApi+`ultima_entrada?gafete=${gafete.split("-")[1]}&puerta=${puerta}`,{headers:headers}).toPromise();
    }else{
      res={"info": true};
    }
    
    return res;
   /*
    let promise = new Promise((resolve, reject) => {
      this._http.get(this.endpointApi+'ultima_entrada?gafete=E0451&puerta=Y')
        .toPromise()
        .then(
          res => {
            resolve(res);
          }
        );
    });
     */
    //return promise;

  }
 
  marcajeService(gafete:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params=JSON.stringify(gafete);
    return this._http.post(this.endpointApi+'verificaPersona',params,{headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getParamsMolinete(name: String):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.endpointApi+'parametrosMoli/'+name, {headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getParamsAllMolinetes():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.endpointApi+'parametrosAllMoli', {headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getMolinetesService():Promise<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.endpointApi+'molinetes',{headers:headers}).toPromise();
    /*
    return this._http.get(this.endpointApi+'molinetesss', {headers:headers}).pipe(
      catchError(this.error)
    );
    */
  }
  
  getMolinetesService2():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.endpointApi+'molinetes',{headers:headers}).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.log(error)
      )
    );
  }

  error(error: HttpErrorResponse) {
    //console.log("ss",error.error.error);
    let errorMessage = '';
    if (error.error.error) {
      errorMessage = error.error.error;
    }else if (error.error.message) {
      errorMessage = error.error.message;
    }else if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log(errorMessage);
    return throwError(errorMessage);
  }

}
