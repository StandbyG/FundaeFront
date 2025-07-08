import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../../core/services/auth.services';
import { Component } from '@angular/core';
import { AjusteRazonableService } from '../../services/ajuste-razonable.service';
import { CommonModule } from '@angular/common';

import { AjusteRazonable } from '../../core/models/ajuste-razonable.model';

@Component({
  selector: 'app-ajuste-razonable-create',
  standalone: true,
  imports: [CommonModule, FormsModule], // Incluir FormsModule aquí
  templateUrl: './ajuste-razonable-create.component.html',
  styleUrls: ['./ajuste-razonable-create.component.scss']
})
export class AjusteRazonableCreateComponent {
  tipoAjuste: string = '';
  descripcion: string = '';
  estado: string = 'pendiente';
  fechaRecomendacion: string = '';  // Definir el campo de fecha
  fechaImplementacion: string = '';  // Definir el campo de fecha
  usuarioId: number = 1;  // Supongamos que el usuarioId es 1, asignar un valor adecuado
  alertado: boolean = false;  // Asignar valor por defecto

  constructor(private ajusteService: AjusteRazonableService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
  // Obtener el userId desde el token al cargar el componente
  const userId = this.authService.getUserId();
  console.log('User ID desde el token:', userId);  // Verifica si el userId está llegando correctamente

  if (userId !== null) {
    this.usuarioId = userId;  // Asignar el userId del token
  } else {
    console.log('No se encuentra el userId o token no válido.');
    this.router.navigate(['/login']);  // Redirigir al login si el userId no está presente
  }
}




  createAjuste(): void {
      if (!this.tipoAjuste || !this.descripcion || !this.fechaRecomendacion || !this.fechaImplementacion) {
      alert('Por favor complete todos los campos');
      return;  // No proceder si falta algún campo obligatorio
    }
    const nuevoAjuste: AjusteRazonable = {
      tipoAjuste: this.tipoAjuste,
      descripcion: this.descripcion,
      estado: this.estado,
      fechaRecomendacion: this.fechaRecomendacion,  // Asegurarse de que las fechas estén asignadas
      fechaImplementacion: this.fechaImplementacion,  // Asegurarse de que las fechas estén asignadas
      alertado: this.alertado,  // Incluir el campo alertado
      usuarioId: this.usuarioId,  // Asegurarse de que el usuarioId esté asignado
    };

    this.ajusteService.createAjuste(nuevoAjuste).subscribe(() => {
      this.router.navigate(['/ajustes']);
    }, error => {
      console.error('Error al crear ajuste:', error);
      alert('Hubo un error al crear el ajuste. Intente nuevamente.');
    });
  }
    navigateToDashboard() {
    this.router.navigate(['/dashboard']);  // Cambia '/dashboard' por la ruta correspondiente a tu Dashboard
  }
}
