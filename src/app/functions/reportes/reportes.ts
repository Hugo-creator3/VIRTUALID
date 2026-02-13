import { Component, OnInit } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterOutlet } from '@angular/router';
import { Nabvar } from '../../shared/nabvar/nabvar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, Nabvar, CommonModule, FormsModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  
  // Modelo del formulario
  reporte = {
    tipoReporte: '',
    fechaInicio: '',
    fechaFin: '',
    mensaje: ''
  };

  // Opciones para el select
  tiposReporte = [
    'Problema de sistema',
    'Error de acceso',
    'Fallo técnico',
    'Sugerencia',
    'Otro'
  ];

  ngOnInit(): void {
    // Inicialización del componente
  }

  // Método para enviar el reporte
  enviarReporte(): void {
    console.log('Reporte enviado:', this.reporte);
    
    // Validación básica
    if (!this.reporte.tipoReporte) {
      alert('Por favor selecciona un tipo de reporte');
      return;
    }
    
    if (!this.reporte.fechaInicio || !this.reporte.fechaFin) {
      alert('Por favor selecciona el rango de fechas');
      return;
    }
    
    if (!this.reporte.mensaje.trim()) {
      alert('Por favor escribe un mensaje');
      return;
    }

    // Aquí puedes agregar la lógica para enviar el reporte al backend
    alert('Reporte enviado exitosamente');
    
    // Limpiar el formulario
    this.limpiarFormulario();
  }

  // Método para limpiar el formulario
  limpiarFormulario(): void {
    this.reporte = {
      tipoReporte: '',
      fechaInicio: '',
      fechaFin: '',
      mensaje: ''
    };
  }
}