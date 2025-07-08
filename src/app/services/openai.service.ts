import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // API endpoint de OpenAI
  private apiKey = environment.openAIApiKey;

  constructor(private http: HttpClient) {}

  // Método para enviar mensaje a la API de OpenAI
  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-4.1', // Utiliza GPT-4 o cualquier modelo que desees
      messages: [{ role: 'user', content: message }], // Cambié la estructura de 'prompt' a 'messages' (nuevo formato de la API)
      max_tokens: 150,
      temperature: 0.7,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
    
}