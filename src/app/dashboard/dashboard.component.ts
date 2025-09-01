import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.services';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from '../chatbot/chatbot';
import { HistorialChatbotComponent } from '../components/historial-chatbot/historial-chatbot';
import { AjusteRazonable } from '../core/models/ajuste-razonable.model';
import { AjusteRazonableService } from '../services/ajuste-razonable.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FormsModule } from '@angular/forms';
import { Dropdown } from 'bootstrap';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    ChatbotComponent,
    RouterModule,
    HistorialChatbotComponent,
    BaseChartDirective,
    FormsModule,
  ],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // --- Propiedades del Componente ---
  showChatbot: boolean = false;
  showHistorial: boolean = false;
  isAdmin: boolean = false;
  isLoading: boolean = true;
  userMenuOpen = false;
  ajustes: AjusteRazonable[] = [];
  filteredAjustes: AjusteRazonable[] = [];
  openDropdown: string | null = null;
  searchTerm: string = '';

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] | null =
    null;
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom', // Mueve la leyenda abajo para dar más espacio
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0,0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
      },
      datalabels: {
        // Muestra el porcentaje en cada sección del gráfico
        formatter: (value, ctx) => {
          if (ctx.chart.data.datasets[0].data) {
            const total = ctx.chart.data.datasets[0].data.reduce(
              (a, b) => (a as number) + (b as number),
              0
            ) as number;
            const percentage =
              (((value as number) / total) * 100).toFixed(1) + '%';
            return percentage;
          }
          return '';
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 16,
        },
      },
    },
  };
  public doughnutChartType: 'doughnut' = 'doughnut';
  public doughnutChartPlugins = [ChartDataLabels];

  constructor(
    private router: Router,
    public authService: AuthService,
    private ajusteService: AjusteRazonableService,
    public themeService: ThemeService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Si el usuario no está logueado, no debería estar aquí. Redirigir.
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return; // Detener la ejecución para evitar más comprobaciones
    }

    // Lógica de rol de usuario consolidada y más segura
    const userRole = this.authService.getRole();
    this.isAdmin = userRole?.toLowerCase() === 'administrador';
    this.loadDashboardData();
  }
  ngAfterViewInit(): void {
    // Esta función se ejecuta DESPUÉS de que el HTML del componente se ha renderizado.
    // Buscamos todos los elementos que activan un dropdown.
    const dropdownElementList = document.querySelectorAll(
      '[data-bs-toggle="dropdown"]'
    );

    // Por cada uno, creamos una nueva instancia del dropdown de Bootstrap para activarlo.
    dropdownElementList.forEach((dropdownToggleEl) => {
      new Dropdown(dropdownToggleEl);
    });
  }

  loadDashboardData(): void {
    this.isLoading = true;

    if (this.isAdmin) {
      // --- LOG PARA ADMIN ---
      this.ajusteService.getAllAjustes().subscribe((data) => {
        this.ajustes = data;
        this.filteredAjustes = data;
        this.isLoading = false;
      });
    } else {
      // --- LOG PARA USUARIO NORMAL ---
      const userId = this.authService.getUserId();
      if (userId) {
        this.ajusteService.getAjustesByUsuarioId(userId).subscribe((data) => {
          this.ajustes = data;
          this.prepareChartData();
          this.isLoading = false;
        });
      } else {
        // Manejar el caso en que no hay ID para el usuario normal
        this.isLoading = false;
        console.error(
          'No se pudo obtener el ID del usuario para cargar sus ajustes.'
        );
      }
    }
  }
  filterAjustes(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredAjustes = this.ajustes; // mostrar todos si no hay término
      return;
    }

    this.filteredAjustes = this.ajustes.filter((ajuste) => {
      const tipo = ajuste.tipoAjuste?.toLowerCase() || '';
      const descripcion = ajuste.descripcion?.toLowerCase() || '';
      const estado = ajuste.estado?.toLowerCase() || '';
      const usuario = ajuste.usuario?.nombre?.toLowerCase() || '';

      return (
        tipo.includes(term) ||
        descripcion.includes(term) ||
        estado.includes(term) ||
        usuario.includes(term)
      );
    });
  }
  private prepareChartData(): void {
    const statusCounts = new Map<string, number>();
    this.ajustes.forEach((ajuste) => {
      const status =
        ajuste.estado.charAt(0).toUpperCase() + ajuste.estado.slice(1);
      statusCounts.set(status, (statusCounts.get(status) || 0) + 1);
    });

    const labels = Array.from(statusCounts.keys());
    const data = Array.from(statusCounts.values());

    this.doughnutChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            '#FFC107', // Amarillo para Pendiente
            '#28A745', // Verde para Aprobado
            '#DC3545', // Rojo para Rechazado
            '#6C757D', // Gris para otros estados
          ],
          borderColor: '#fff', // Borde blanco para separar las secciones
          borderWidth: 2,
          hoverBorderColor: '#fff',
        },
      ],
    };
  }

  getStatusClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'aprobado':
        return 'badge bg-success';
      case 'pendiente':
        return 'badge bg-warning text-dark';
      case 'rechazado':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  // --- Métodos de Navegación ---
  navigateToCreateAjuste(): void {
    this.router.navigate(['/ajustes/create']);
  }

  navigateToListAjustes(): void {
    this.router.navigate(['/ajustes']);
  }

  navigateToMyAjustes(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.router.navigate([`/ajustes/usuario/${userId}`]);
    }
  }

  navigateToSearchUsers(): void {
    if (this.isAdmin) {
      this.router.navigate(['/search']);
    }
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/perfil']);
  }

  navigateToCreateVerificacion(): void {
    if (this.isAdmin) {
      this.router.navigate(['/verificacion/create']);
    }
  }

  // --- Métodos de Acciones de la UI ---
  toggleChatbot(): void {
    this.showChatbot = !this.showChatbot;
  }

  toggleHistorial(): void {
    this.showHistorial = !this.showHistorial;
    // Buena práctica: si se muestra el historial, se oculta el chatbot
    if (this.showHistorial) {
      this.showChatbot = false;
    }
  }

  signOut(): void {
    // El servicio de autenticación ya se encarga de la redirección
    this.authService.logout();
  }
  navigateToUserList(): void {
    this.router.navigate(['/admin/usuarios']);
  }
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  toggleUserMenu(event: MouseEvent) {
    event.preventDefault();
    this.userMenuOpen = !this.userMenuOpen;
  }
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-item.dropdown')) {
      this.userMenuOpen = false;
    }
  }
  toggleDropdown(menu: string, event: MouseEvent) {
    event.preventDefault();
    this.openDropdown = this.openDropdown === menu ? null : menu;
  }
}
