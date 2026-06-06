import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AsistenciasService } from '../../../services/asistencias.service';


interface Asistencia {
  id: number;
  fechaHora: string;
  usuario: string;
  ubicacion: string;
  estado: 'Aceptado' | 'Denegado' | 'Retraso';
  minutosRetraso: number;
}

@Component({
  selector: 'app-asistencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistencias.html',
  styleUrl: './asistencias.css',
})
export class Asistencias implements OnInit {
  asistencias: Asistencia[] = [];
  paginatedAsistencias: Asistencia[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;
  currentFilter: string = 'hoy';

  ngOnInit() {
    this.loadAsistencias();
    this.updatePaginatedAsistencias();
  }

  constructor(private asistenciasService: AsistenciasService) {}

loadAsistencias() {
  this.asistenciasService.getAsistencias().subscribe(data => {

    this.asistencias = data.map(a => ({
      id: Number(a.id_asistencia),
      fechaHora: new Date(a.fecha_hora).toLocaleString(),
      usuario: `${a.usuario.nombre} ${a.usuario.apellidos}`,
      ubicacion: `${a.latitud}, ${a.longitud}`,
      estado:
      a.estado === 'ACEPTADO'
      ? 'Aceptado'
      : a.estado === 'RETRASO'
      ? 'Retraso'
      : 'Denegado',

minutosRetraso: a.minutos_retraso    }));

    this.totalPages = Math.ceil(this.asistencias.length / this.itemsPerPage);
    this.updatePaginatedAsistencias();

  });
}

  updatePaginatedAsistencias() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAsistencias = this.asistencias.slice(startIndex, endIndex);
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    console.log('Filtro seleccionado:', filter);
    
    switch(filter) {
      case 'hoy':
        console.log('Mostrando asistencias de hoy');
        break;
      case 'especificar':
        console.log('Abrir selector de fecha');
        break;
      case 'categoria':
        console.log('Filtrar por categoría');
        break;
      case 'control':
        console.log('Panel de control');
        break;
    }
  }

  showMoreOptions(asistencia: Asistencia) {
    console.log('Más opciones para:', asistencia);
    alert(`Opciones para ${asistencia.usuario}\n- Ver detalles\n- Editar estado\n- Historial`);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedAsistencias();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedAsistencias();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedAsistencias();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(this.totalPages, this.currentPage + 2);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  exportData() {
    console.log('Exportar datos de asistencia');
    alert('Exportar asistencias - Próximamente');
    
  }

  getEstadoClass(estado: string): string {
    return estado.toLowerCase();
  }

  getTotalAceptados(): number {
    return this.asistencias.filter(a => a.estado === 'Aceptado').length;
  }

  getTotalDenegados(): number {
    return this.asistencias.filter(a => a.estado === 'Denegado').length;
  }

  getPorcentajeAsistencia(): number {
    const total = this.asistencias.length;
    const aceptados = this.getTotalAceptados();
    return total > 0 ? Math.round((aceptados / total) * 100) : 0;
  }
}