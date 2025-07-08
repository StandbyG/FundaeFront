import { Usuario } from './usuario.model';

export interface ChatbotLog {
  idLog?: number;
  usuarioId: number;
  pregunta: string;
  respuesta: string;
  fecha: Date;
}
