import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AjusteRazonableService } from '../services/ajuste-razonable.service';
import { AjusteRazonable } from '../core/models/ajuste-razonable.model';

@Component({
  selector: 'app-mis-ajustes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-ajustes.html',
  styleUrls: ['./mis-ajustes.scss']
})
export class MisAjustesComponent implements OnInit {
  ajustes: AjusteRazonable[] = [];

  constructor(
    private route: ActivatedRoute,
    private ajusteService: AjusteRazonableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idUsuario = Number(this.route.snapshot.paramMap.get('id'));
    this.ajusteService.getAjustesByUsuarioId(idUsuario).subscribe(
      (data) => (this.ajustes = data),
      (error) => console.error('Error al cargar ajustes:', error)
    );
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);  // Cambia '/dashboard' por la ruta correspondiente a tu Dashboard
  }
}
