import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.services';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from '../chatbot/chatbot';
import { HistorialChatbotComponent } from '../components/historial-chatbot/historial-chatbot';
// ajusta la ruta si es diferente

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, ChatbotComponent,HistorialChatbotComponent]
})
export class DashboardComponent implements OnInit {
  showChatbot: boolean = false; // Controla si el chatbot es visible o no
  isAdmin: boolean = false; // Para controlar si el usuario es administrador

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Verifica si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
    console.log("Usuario no autenticado, redirigiendo al login.");
    this.router.navigate(['/login']);  // Redirige al login si no está autenticado
  }else {
    // Verificar si el usuario tiene rol de administrador
    this.isAdmin = this.authService.getRole() === 'administrador';
    console.log("Rol del usuario: ", this.authService.getRole());
  }
  }

  // Redirigir al formulario de ajustes razonables
  navigateToCreateAjuste() {
    this.router.navigate(['/ajustes/create']);
  }

  // Redirigir a la lista de ajustes razonables
  navigateToListAjustes() {
    this.router.navigate(['/ajustes']);
  }

  // Redirigir a los ajustes del usuario autenticado
  navigateToMyAjustes() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.router.navigate([`/ajustes/usuario/${userId}`]);  // Ruta que debe existir
    } else {
      console.warn('Usuario no autenticado o token inválido.');
    }
  }

  // Redirigir a la página de búsqueda de usuarios si es administrador
  navigateToSearchUsers() {
    if (this.isAdmin) {
      this.router.navigate(['/search']);  // Redirige a la página de búsqueda
    } else {
      console.warn('Solo los administradores pueden acceder a esta sección.');
    }
  }

  navigateToCreateVerificacion() {
    if (this.isAdmin) {
      this.router.navigate(['/verificacion/create']);  // Redirige a la página de crear verificación
    } else {
      console.warn('Solo los administradores pueden acceder a esta sección.');
    }
  }

  toggleChatbot() {
    this.showChatbot = !this.showChatbot; // Cambia la visibilidad del chatbot
  }
    signOut() {
    this.authService.logout();  // Llama al método logout del servicio
  }
  showHistorial = false;

toggleHistorial() {
  this.showHistorial = !this.showHistorial;
  if (this.showHistorial) this.showChatbot = false;
}
}