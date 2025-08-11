import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../core/services/auth.services';
import { AjusteRazonableService } from '../../services/ajuste-razonable.service';
import { CommonModule } from '@angular/common';
// 👇 Importa las herramientas para Formularios Reactivos
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AjusteRazonableCreate } from '../../core/models/ajuste-razonable-create.model';

@Component({
  selector: 'app-ajuste-razonable-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink], // 👈 Cambia FormsModule por ReactiveFormsModule
  templateUrl: './ajuste-razonable-create.component.html',
  styleUrls: ['./ajuste-razonable-create.component.scss']
})
export class AjusteRazonableCreateComponent implements OnInit {
  
  ajusteForm: FormGroup; // 👈 Un solo objeto para manejar todo el formulario

  constructor(
    private fb: FormBuilder, // 👈 Inyecta el FormBuilder
    private ajusteService: AjusteRazonableService, 
    private router: Router, 
    private authService: AuthService
  ) {
    // Inicializamos el formulario en el constructor
    this.ajusteForm = this.fb.group({
      tipoAjuste: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaRecomendacion: ['', Validators.required],
      fechaImplementacion: ['', Validators.required],
      estado: ['pendiente', Validators.required],
      usuarioId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      // Asigna el ID del usuario al campo correspondiente en el formulario
      this.ajusteForm.patchValue({ usuarioId: userId });
    } else {
      console.log('No se encuentra el userId, redirigiendo al login.');
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void { // Renombrado de createAjuste a onSubmit
    // La validación ahora es mucho más simple
    if (this.ajusteForm.invalid) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    // El objeto del formulario ya coincide con nuestro modelo de creación
    const nuevoAjuste: AjusteRazonableCreate = this.ajusteForm.value;

    this.ajusteService.createAjuste(nuevoAjuste).subscribe({
      next: () => {
        alert('Ajuste creado con éxito');
        this.router.navigate(['/dashboard']); // Redirigir al dashboard o a la lista
      },
      error: (err) => {
        console.error('Error al crear ajuste:', err);
        alert('Hubo un error al crear el ajuste. Intente nuevamente.');
      }
    });
  }
}