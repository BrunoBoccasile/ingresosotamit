import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionApiService
{
  api: string = 'http://localhost:3000/';

  constructor(private http: HttpClient)
  {
  }

  getEmpleado(idEmpleado: number): Observable<any>
  {
    return this.http.get<any[]>(this.api + 'empleados/' + idEmpleado);
  }

  getEmpleados(): Observable<any>
  {
    return this.http.get<any[]>(this.api + 'empleados/');
  }

  crearEmpleado(datosEmpleado: object): Observable<any>
  {
    console.log(JSON.stringify(datosEmpleado));
    return this.http.post<any>(
      this.api + 'empleados/',
      datosEmpleado,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  modificarEmpleado(idEmpleado: number, datosEmpleado: object): Observable<any>
  {
    console.log(idEmpleado + " -> " + JSON.stringify(datosEmpleado));
    return this.http.patch<any>(
      this.api + 'empleados/' + idEmpleado,
      datosEmpleado,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  eliminarEmpleado(idEmpleado: number): Observable<any>
  {
    return this.http.delete<any[]>(this.api + 'empleados/' + idEmpleado)
  }

  getAreas(): Observable<any>
  {
    return this.http.get<any[]>(this.api + 'areas/');
  }
}
