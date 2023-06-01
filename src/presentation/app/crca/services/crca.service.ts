import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Crca } from '../interfaces/crca.interface';
import { CrcaNumerario } from '../interfaces/crca-numerario.interface';

@Injectable({
  providedIn: 'root'
})
export class CrcaService {
  private baseUrl: string = environments.baseUrl;
  constructor(private http: HttpClient) { }

  // getCrca(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/crca`);
  // }

  getAllCrca(codContabilidad: any): Observable<any | undefined> {
    const url = `${this.baseUrl}/Crca/GetCrcaAll`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, codContabilidad, httpOptions).pipe(
      catchError(error => of(undefined))
    );

  }

  saveCrca(crcaNumerario: CrcaNumerario): Observable<any | undefined> {
    const url = `${this.baseUrl}/Crca/SaveCrcaNumerario`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, crcaNumerario, httpOptions).pipe(
      catchError(error => { console.log("entro en catch", error); return of({ ...error.error }); })
    );
  }

  GetCatalogoByCodPad(codigoPadre: any): Observable<any | undefined> {
    const url = `${this.baseUrl}/Catalogo/GetCatalogoByCodPad`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, codigoPadre, httpOptions).pipe(
      catchError(error => of(undefined))
    );

  }
  getCrcaById(id: string): Observable<any | undefined> {
    const url = `${this.baseUrl}/Crca/GetCrcaByCod`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, { codigoCrca: id }, httpOptions).pipe(
      catchError(error => of(undefined))
    );
  }

  GetPersonaByCi(body: any): Observable<any | undefined> {
    const url = `${this.baseUrl}/Persona/GetPersonaByCi`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, body, httpOptions).pipe(
      catchError(error => of(error))
    );
  }
  GetArchivoByCodTab(body: any): Observable<any | undefined> {
    const url = `${this.baseUrl}/General/GetArchivoByCodTab`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, body, httpOptions).pipe(
      catchError(error => of(error))
    );
  }
}
