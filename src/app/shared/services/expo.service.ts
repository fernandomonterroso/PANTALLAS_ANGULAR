import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Gafete } from 'src/app/models/gafete';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';


@Injectable({
  providedIn: 'root'
})
export class ExpoService {

  endpointApi:any = environment.endpointApiNode;
  appEnd:any = environment.endpointPesos;

  public setSession(authResult) {

    const expiresAt = this.getDecodedAccessToken(authResult.accessToken);
    const creationat= this.getDecodedAccessToken(authResult.accessToken);
    const gafete= this.getDecodedAccessToken(authResult.accessToken);
    const logon= this.getDecodedAccessToken(authResult.accessToken);
    

    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem("create_at", JSON.stringify(creationat.valueOf()) );
    localStorage.setItem("usuario",gafete);
    localStorage.setItem("logon",logon);

  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  logout(){
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("create_at");
    localStorage.removeItem("usuario");
    localStorage.removeItem("logon");
  }

  constructor(private http: HttpClient) { }

  getBasculasEnd(basCod:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.endpointApi+'getBasculasEnd/'+basCod, {headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getBasculas():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.endpointApi+'getBasculas/', {headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getPesosApi(peso: any):Observable<any>{
    let params = { endpoint :peso};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.endpointApi+'getPeso',params, {headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getTaras2():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.endpointApi+'getTaras', {headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getData(gafete:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(gafete);
    return this.http.post(this.endpointApi+'token',params,{headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getGuia(linagen:any, inicio: any, fin:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'id_token');
    return this.http.get(this.endpointApi+'getGuia?linagen='+linagen+'&inicio='+inicio+'&fin='+fin,{headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getGuiaAll(inicio:any, fin:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'id_token');
    return this.http.get(this.endpointApi+'getGuiasAll?inicio='+inicio+'&fin='+fin,{headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getPeso(LINK:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'id_token');
    return this.http.get(LINK,{headers:headers}).pipe(
      catchError(this.error)
    );
  }

  getGuiasHijas(guiaMaster:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'id_token');
    return this.http.get(this.endpointApi+'getGuiasHijas?guiaMaster='+guiaMaster, {headers:headers}).pipe(
      catchError(this.error)
    )
  }

  getTarasAsigandas(linagen:any, fecha:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'id_token');
    return this.http.get(this.endpointApi + 'tarasAsig?linagen='+linagen+'&fecha='+fecha, {headers: headers}).pipe(
      catchError(this.error)
    )
  }

  getAllTaras(fecha:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'id_token');
    return this.http.get(this.endpointApi+'allTaras?fecha='+fecha, {headers:headers}).pipe(
      catchError(this.error)
    )
  }

  insertEquipo(linagen:any, numeq:any, peso:any, bascula:any, taracod:any, tipotara:any){
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'id_token');
    return this.http.post(this.endpointApi+'insertEquipo?linagen='+linagen+'&numeq='+numeq+'&peso='+peso+'&bascula='+bascula+'&taracod='+taracod+'&tipotara='+tipotara, {headers:headers}).pipe(
      catchError(this.error)
    )
  }

  deleteEquipo(tara:any){
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'id_token');
    return this.http.delete(this.endpointApi+'delEquip?tara='+tara, { headers: headers }).pipe(
      catchError(this.error)
    );
  }

  updateEquipo(base:any){
    let params = base;
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(this.endpointApi+'updEquip',params, { headers: headers }).pipe(
      catchError(this.error)
    );
  }

  updatePeso(peso:any){
    let params = peso;
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(this.endpointApi+'updPeso', params, { headers: headers }).pipe(
      catchError(this.error)
    );
  }

  insertPesos(INFO:any, PESOS:any){
    let myHeaders = { "Content-Type": "application/x-www-form-urlencoded" };
    let raw = 'INFO=' + JSON.stringify(INFO) + '&PESOS=' + JSON.stringify([PESOS]);
    return this.http.post(this.appEnd+'PostSoli',raw, {headers:myHeaders}).pipe(
      catchError(this.error)
    )
  }

  obtienepesos(datosguia:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'id_token');
    return this.http.get(this.appEnd+'getPesos&CORR=' + datosguia.GUIA_CORR + '&ANIO=' + datosguia.GUIA_ANIO + '&TIPO=' + datosguia.TIPOGUIA_COD + '&PESO_CORR=' + datosguia.PESO_CORR, {headers:headers}).pipe(
      catchError(this.error)
    )
  }

  getHistory(anio:any, peso:any, corre:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'id_token');
    return this.http.get(this.endpointApi+'getHistorial?anio='+anio+'&peso='+peso+'&corre='+corre, {headers:headers}).pipe(
      catchError(this.error)
    )
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



