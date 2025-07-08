import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatbotLog } from '../core/models/chatbot-log.model';
import { AuthService } from '../core/services/auth.services';


@Injectable({ providedIn: 'root' })
export class ChatbotLogService  {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080/api/chatbot-logs';

  guardarConversacion(pregunta: string, respuesta: string): Observable<ChatbotLog> {
    
    const usuarioId = this.authService.getUserId();
    const token = localStorage.getItem('token');
    if (!usuarioId || !token) throw new Error('Usuario no autenticado');
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    });
    const payload: Partial<ChatbotLog> = {
      pregunta,
      respuesta,
      fecha: new Date(),
      usuarioId
    };


    return this.http.post<ChatbotLog>(this.apiUrl, payload,{headers});
  }
  getAllLogs(): Observable<ChatbotLog[]> {
        const usuarioId = this.authService.getUserId();
    const token = localStorage.getItem('token');
    if (!usuarioId || !token) throw new Error('Usuario no autenticado');
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    });
  return this.http.get<ChatbotLog[]>(this.apiUrl,{headers});
  }
}
