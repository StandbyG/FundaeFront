import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.services';
import { AjusteRazonable } from '../core/models/ajuste-razonable.model';

@Injectable({
  providedIn: 'root'
})
export class AjusteRazonableService {
  private apiUrl = 'http://localhost:8080/api/ajustes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllAjustes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getAjusteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`,{
      headers: this.getAuthHeaders()
    });
  }


  // Función para obtener los ajustes razonables
  getAjustes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Función para crear un ajuste razonable
  createAjuste(ajuste: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/create', ajuste, {
      headers: this.getAuthHeaders()
    });
  }

  // Función para obtener el token en las cabeceras
  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

    // Obtener ajustes por usuarioId y estado
  getAjustesByUsuarioIdAndEstado(usuarioId: number, estado: string): Observable<AjusteRazonable[]> {
    return this.http.get<AjusteRazonable[]>(`${this.apiUrl}/usuario/${usuarioId}/estado/${estado}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateAjuste(id: number, ajuste: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ajuste,{
      headers: this.getAuthHeaders()
    });
  }
  
   getAjustesByUsuarioId(usuarioId: number): Observable<AjusteRazonable[]> {
    return this.http.get<AjusteRazonable[]>(`${this.apiUrl}/usuario/${usuarioId}`, {
      headers: this.getAuthHeaders()
    });
  }


  deleteAjuste(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{
      headers: this.getAuthHeaders()
    });
  }
  getAjustesByEstado(estado: string): Observable<AjusteRazonable[]> {
  return this.http.get<AjusteRazonable[]>(`${this.apiUrl}/estado/${estado}`, {
    headers: this.getAuthHeaders()
  });
  }
}
