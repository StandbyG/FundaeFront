export interface AjusteRazonable {
  idAjuste?: number; // Este campo es opcional para la creación
  tipoAjuste: string;
  descripcion: string;
  fechaRecomendacion: string; // Formato "YYYY-MM-DD"
  fechaImplementacion: string; // Formato "YYYY-MM-DD"
  estado: string; // valores posibles: "pendiente", "implementado", "en revisión"
  alertado: boolean;
  usuarioId: number; // ID del usuario que se asocia al ajuste
}
