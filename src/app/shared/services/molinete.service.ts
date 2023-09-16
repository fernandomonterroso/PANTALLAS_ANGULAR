import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Molinete } from 'src/app/models/molinete';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MolineteService {
  endpointMoli:any = environment.endpointMolinete;
  endpointApi:any = environment.endpointApiNode;
  constructor(public _http: HttpClient) { }

  accionesMolinete(molinete: Molinete): Observable<any> {
    let params = JSON.stringify(molinete);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.endpointMoli + 'Molinete/abrir', params, { headers: headers }).pipe(
      catchError(this.error)
    );
  }

  getStatus(ip: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //ping
    return this._http.get(this.endpointMoli+'Molinete/ping?ip='+ip, {headers:headers}).pipe(
      catchError(this.error)
    );
    //sobre sdk
    //return this._http.get(this.endpointMoli+'Molinete/'+ip, {headers:headers});
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
