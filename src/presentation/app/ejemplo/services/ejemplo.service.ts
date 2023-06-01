import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cabecera, Conciliado } from '../interfaces/cabecara.interface';
@Injectable({
  providedIn: 'root'
})
export class EjemploService {
  public apiUrl: string = "https://localhost:7288/Prueba/SavePrueba";

  constructor(private http: HttpClient) { }
  private setEjemploRequest(url: string, body:any): Observable<Conciliado> {
    const httpOptions= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Conciliado>(url,body,httpOptions);
     
  }

  saveEjemplo(cabecera: Conciliado): Observable<Conciliado> {
    const url= this.apiUrl;
    return this.setEjemploRequest(url,cabecera);
       
}

}
