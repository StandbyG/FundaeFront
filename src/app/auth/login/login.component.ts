import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  correo = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  // Método de login
  login() {
    // Limpiar cualquier mensaje de error antes de intentar el login
    this.error = '';

    // Validar si los campos de correo y password no están vacíos
    if (!this.correo || !this.password) {
      this.error = 'Por favor ingresa todos los campos';
      return;  // Detener la ejecución si los campos no están completos
    }
    

    // Realizar la solicitud de login
    this.auth.login({ correo: this.correo, contraseña: this.password }).subscribe({
      next: (res) => {
        // Guardar el token en el localStorage
        this.auth.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        // Mostrar mensaje de error si las credenciales son inválidas
        this.error = 'Credenciales inválidas';
      }
    });
  }
    goToRegister() {
    this.router.navigate(['/register']); // Asegúrate de que esta ruta esté configurada en tu archivo de rutas
  }
}
