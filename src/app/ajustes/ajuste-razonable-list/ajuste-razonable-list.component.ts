import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjusteRazonableService } from '../../services/ajuste-razonable.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajuste-razonable-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ajuste-razonable-list.component.html',
  styleUrls: ['./ajuste-razonable-list.component.scss']
})
export class AjusteRazonableListComponent implements OnInit {
  ajustes: any[] = [];

  constructor(private ajusteService: AjusteRazonableService, private router: Router) {}

  ngOnInit(): void {
    this.getAjustes();
  }

  getAjustes(): void {
    this.ajusteService.getAllAjustes().subscribe(data => {
      this.ajustes = data;
    });
  }

  deleteAjuste(id: number): void {
    this.ajusteService.deleteAjuste(id).subscribe(() => {
      this.getAjustes(); // Refresh the list after deletion
    });
  }

  editAjuste(id: number): void {
    this.router.navigate(['/ajustes/edit', id]);
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);  // Cambia '/dashboard' por la ruta correspondiente a tu Dashboard
  }
}
