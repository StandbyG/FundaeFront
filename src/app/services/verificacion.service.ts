import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Verificacion } from '../core/models/verificacion.model';
 // Asegúrate de tener un modelo para Verificacion

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {

  private apiUrl = 'http://localhost:8080/api/verificaciones';  // URL del backend para crear una verificación

  constructor(private http: HttpClient) {}

  // Método para insertar una nueva verificación
  createVerificacion(verificacion: Verificacion): Observable<Verificacion> {
    const token = localStorage.getItem('token');  // Recuperar el token desde localStorage
    if (!token) {
      throw new Error('No token found');  // Si no hay token, lanza un error
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Agregar el token al encabezado Authorization
    });

    return this.http.post<Verificacion>(this.apiUrl, verificacion, { headers });
  }
}
