// reportes.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {

  // ── Modelo original intacto ──────────────────────
  reporte = {
    tipoReporte: '',
    fechaInicio: '',
    fechaFin: '',
    mensaje: ''
  };

  tiposReporte = [
    'Problema de sistema',
    'Error de acceso',
    'Fallo técnico',
    'Sugerencia',
    'Otro'
  ];

  // ── Nuevos modelos (simulados) ───────────────────
  nombreInstitucion = 'Mi Institución';

  pushGlobal = {
    tipo: 'informativo',
    mensaje: ''
  };

  pushIndividual = {
    busqueda: '',
    usuarioSeleccionado: '',
    mensaje: ''
  };

  // Usuarios simulados para búsqueda individual
  usuariosSimulados = [
    { id: 'USR-001', nombre: 'Elizabeth Vega',   rol: 'Estudiante',     iniciales: 'EV' },
    { id: 'USR-002', nombre: 'Carlos Mendoza',   rol: 'Docente',        iniciales: 'CM' },
    { id: 'USR-003', nombre: 'Ana Rodríguez',    rol: 'Estudiante',     iniciales: 'AR' },
    { id: 'USR-004', nombre: 'Luis Herrera',     rol: 'Administrativo', iniciales: 'LH' },
    { id: 'USR-005', nombre: 'María González',   rol: 'Estudiante',     iniciales: 'MG' },
    { id: 'USR-006', nombre: 'Roberto Castillo', rol: 'Docente',        iniciales: 'RC' },
  ];

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {}

  // ── Métodos originales intactos ──────────────────
  enviarReporte(): void {
    if (!this.reporte.tipoReporte) {
      alert('Selecciona tipo de reporte');
      return;
    }
    if (!this.reporte.fechaInicio || !this.reporte.fechaFin) {
      alert('Selecciona fechas');
      return;
    }
    if (!this.reporte.mensaje.trim()) {
      alert('Escribe un mensaje');
      return;
    }

    this.reportesService.enviarReporte(this.reporte).subscribe({
      next: () => {
        alert('Reporte enviado correctamente 🚀');
        this.limpiarFormulario();
      },
      error: () => {
        alert('Error al enviar reporte ❌');
      }
    });
  }

  limpiarFormulario(): void {
    this.reporte = {
      tipoReporte: '',
      fechaInicio: '',
      fechaFin: '',
      mensaje: ''
    };
  }

  // ── Métodos push (simulados) ─────────────────────
  getUsuariosFiltrados() {
    const q = this.pushIndividual.busqueda.toLowerCase();
    return this.usuariosSimulados.filter(u =>
      u.nombre.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q) ||
      u.rol.toLowerCase().includes(q)
    );
  }

  seleccionarUsuario(u: any) {
    this.pushIndividual.usuarioSeleccionado =
      this.pushIndividual.usuarioSeleccionado === u.id ? '' : u.id;
  }

  enviarPushGlobal() {
    if (!this.pushGlobal.mensaje.trim()) {
      alert('Escribe un mensaje para el aviso global');
      return;
    }
    // Aquí conectarás tu servicio de push cuando esté listo
    alert(`✅ Aviso "${this.pushGlobal.tipo}" enviado a todos los usuarios`);
    this.pushGlobal.mensaje = '';
    this.pushGlobal.tipo = 'informativo';
  }

  enviarPushIndividual() {
    if (!this.pushIndividual.usuarioSeleccionado || !this.pushIndividual.mensaje.trim()) return;
    const usuario = this.usuariosSimulados.find(u => u.id === this.pushIndividual.usuarioSeleccionado);
    alert(`✅ Mensaje enviado a ${usuario?.nombre}`);
    this.pushIndividual = { busqueda: '', usuarioSeleccionado: '', mensaje: '' };
  }
}