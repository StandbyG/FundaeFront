import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AjusteRazonableService } from '../../services/ajuste-razonable.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajuste-razonable-edit',
  standalone: true,
  imports: [CommonModule, FormsModule], // Incluir FormsModule aquí
  templateUrl: './ajuste-razonable-edit.component.html',
  styleUrls: ['./ajuste-razonable-edit.component.scss']
})
export class AjusteRazonableEditComponent implements OnInit {
  id: number = 0;
  tipoAjuste: string = '';
  descripcion: string = '';
  estado: string = 'pendiente';
  ajusteCompleto: any = {};
  mensajeExito: string = '';
  fechaRecomendacion: string = '';
  fechaImplementacion: string = '';
  alertado: boolean = false;
  usuarioId: number = 0;

  constructor(
    private ajusteService: AjusteRazonableService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getAjuste();
  }

getAjuste(): void {
  this.ajusteService.getAjusteById(this.id).subscribe(ajuste => {
    this.ajusteCompleto = ajuste;

    // Para que puedas usar los campos en el template
    this.tipoAjuste = ajuste.tipoAjuste;
    this.descripcion = ajuste.descripcion;
    this.estado = ajuste.estado;
    this.fechaRecomendacion = ajuste.fechaRecomendacion;
    this.fechaImplementacion = ajuste.fechaImplementacion;
    this.alertado = ajuste.alertado;
    this.usuarioId = ajuste.usuarioId;
  });
}

updateAjuste(): void {
  const updated = {
    ...this.ajusteCompleto,
    estado: this.estado
  };

  this.ajusteService.updateAjuste(this.id, updated).subscribe(() => {
    this.mensajeExito = 'Estado actualizado con éxito';
    setTimeout(() => this.mensajeExito = '', 3000);
    this.router.navigate(['/ajustes']);
  }, error => {
    console.error('Error al actualizar:', error);
    alert('No se pudo actualizar el ajuste.');
  });
  }
  navigateToDashboard(): void {
  this.router.navigate(['/dashboard']);
}
}
