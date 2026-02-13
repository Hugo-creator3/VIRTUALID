import { Component, OnInit } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterOutlet } from '@angular/router';
import { Nabvar } from '../../shared/nabvar/nabvar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [RouterOutlet, Nabvar, CommonModule],
  templateUrl: './planes.html',
  styleUrl: './planes.css',
})
export class Planes implements OnInit {
  
  // Lista de planes
  planes = [
    {
      precio: '$19',
      periodo: '',
      nombre: 'Básico',
      descripcion: 'Para instituciones pequeñas',
      caracteristicas: [
        'Credenciales digitales',
        'Panel Administrativo',
        'Generación de tarjetas'
      ],
      destacado: false
    },
    {
      precio: '$54',
      periodo: '/mes',
      nombre: 'Profesional',
      descripcion: 'Herramientas avanzadas',
      caracteristicas: [
        'xxxxxxxxx',
        'xxxxxxxxx',
        'xxxxxxxxx',
        'xxxxxxxxx'
      ],
      destacado: false
    },
    {
      precio: '$89',
      periodo: '/mes',
      nombre: 'Compañía',
      descripcion: 'Todos los recursos ilimitados',
      caracteristicas: [
        'xxxxxxxxxxxx',
        'xxxxxxxxxxxx',
        'xxxxxxxxxxxx',
        'xxxxxxxxxxxx',
        'xxxxxxxxxxxx'
      ],
      destacado: true
    }
  ];

  ngOnInit(): void {
    // Inicialización del componente
  }

  // Método para elegir un plan
  elegirPlan(planNombre: string): void {
    console.log(`Plan seleccionado: ${planNombre}`);
    // Aquí puedes agregar la lógica de navegación o procesamiento
    // Por ejemplo: this.router.navigate(['/registro'], { queryParams: { plan: planNombre } });
  }
}