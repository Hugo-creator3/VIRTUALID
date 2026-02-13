import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  
  ngAfterViewInit(): void {
    this.createBarChart();
    this.createLineChart();
  }

  createBarChart() {
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        datasets: [
          {
            label: 'Ventas',
            data: [12, 19, 3, 5, 2, 3, 9],
          },
          {
            label: 'Ganancias',
            data: [8, 15, 6, 4, 7, 2, 5],
          }
        ]
      }
    });
  }

  createLineChart() {
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['0','1','2','3','4','5','6','7','8','9'],
        datasets: [
          {
            label: 'Ingresos',
            data: [5, 9, 3, 7, 10, 8, 6, 7, 9, 4],
          },
          {
            label: 'Costos',
            data: [4, 8, 5, 2, 3, 6, 5, 4, 1, 3],
          }
        ]
      }
    });
  }


}
