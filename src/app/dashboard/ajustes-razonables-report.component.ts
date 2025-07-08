import { NgChartsModule } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { AjusteRazonableService } from '../services/ajuste-razonable.service';
import { AjusteRazonable } from '../core/models/ajuste-razonable.model';
import { AuthService } from '../core/services/auth.services';

@Component({
  selector: 'app-ajustes-razonables-report',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './ajustes-razonables-report.component.html',
  styleUrls: ['./ajustes-razonables-report.component.scss'],
})
export class AjustesRazonablesReportComponent implements OnInit {
  ajustes: AjusteRazonable[] = [];
  chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#34495e',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
        backgroundColor: '#2c3e50',
        titleColor: '#ecf0f1',
        bodyColor: '#ecf0f1',
        borderColor: '#95a5a6',
        borderWidth: 1,
      },
    },
  };
  chartType: ChartType = 'pie';
  chartTypes: ChartType[] = ['pie', 'doughnut', 'bar'];

  constructor(
    private ajusteService: AjusteRazonableService,
    private authService: AuthService
  ) {}
  cambiarTipo(tipo: ChartType): void {
    this.chartType = tipo;
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.getAjustesReport(userId);
    } else {
      console.warn('No se pudo obtener el ID del usuario desde el token.');
    }
  }

  getAjustesReport(userId: number): void {
    this.ajusteService.getAjustesByUsuarioId(userId).subscribe(
      (data) => {
        this.ajustes = data;
        this.createChartData();
      },
      (error) => {
        console.error('Error al obtener los ajustes del usuario:', error);
      }
    );
  }

  createChartData(): void {
    const estadosCount = this.ajustes.reduce((acc, ajuste) => {
      acc[ajuste.estado] = (acc[ajuste.estado] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    this.chartData = {
      labels: Object.keys(estadosCount),
      datasets: [
        {
          data: Object.values(estadosCount),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8BC34A',
            '#9C27B0',
          ],
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    };
  }
}
