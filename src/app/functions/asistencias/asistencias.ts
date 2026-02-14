import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Asistencia {
  id: number;
  fechaHora: string;
  usuario: string;
  ubicacion: string;
  estado: 'Aceptado' | 'Denegado';
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

  loadAsistencias() {
    this.asistencias = [
      {
        id: 1,
        fechaHora: '7:00 a.m',
        usuario: 'Leslie Maya',
        ubicacion: 'Campus(A2)',
        estado: 'Aceptado'
      },
      {
        id: 2,
        fechaHora: '7:00 a.m',
        usuario: 'Nemo Zola',
        ubicacion: 'Campus(A2)',
        estado: 'Aceptado'
      },
      {
        id: 3,
        fechaHora: '7:00 a.m',
        usuario: 'Alex Petra',
        ubicacion: 'Campus(A2)',
        estado: 'Aceptado'
      },
      {
        id: 4,
        fechaHora: '7:00 a.m',
        usuario: 'Mateo Cuna',
        ubicacion: 'Campus(A2)',
        estado: 'Denegado'
      },
      {
        id: 5,
        fechaHora: '7:00 a.m',
        usuario: 'Antonio Mérida',
        ubicacion: 'Campus(A2)',
        estado: 'Aceptado'
      },
      {
        id: 6,
        fechaHora: '7:00 a.m',
        usuario: 'André Gutiérrez',
        ubicacion: 'Campus(A2)',
        estado: 'Denegado'
      },
      {
        id: 7,
        fechaHora: '7:00 a.m',
        usuario: 'Jorge Ferrera',
        ubicacion: 'Campus(A2)',
        estado: 'Aceptado'
      },
      {
        id: 8,
        fechaHora: '7:00 a.m',
        usuario: 'Josué Domínguez',
        ubicacion: 'Campus(A2)',
        estado: 'Aceptado'
      },
      {
        id: 9,
        fechaHora: '8:00 a.m',
        usuario: 'Maria Garcia',
        ubicacion: 'Campus(B1)',
        estado: 'Aceptado'
      },
      {
        id: 10,
        fechaHora: '8:00 a.m',
        usuario: 'Carlos Mendez',
        ubicacion: 'Campus(B1)',
        estado: 'Aceptado'
      },
      {
        id: 11,
        fechaHora: '8:15 a.m',
        usuario: 'Ana Lopez',
        ubicacion: 'Campus(A2)',
        estado: 'Denegado'
      },
      {
        id: 12,
        fechaHora: '8:30 a.m',
        usuario: 'Pedro Santos',
        ubicacion: 'Campus(C3)',
        estado: 'Aceptado'
      },
      {
        id: 13,
        fechaHora: '8:45 a.m',
        usuario: 'Laura Martinez',
        ubicacion: 'Campus(A2)',
        estado: 'Aceptado'
      },
      {
        id: 14,
        fechaHora: '9:00 a.m',
        usuario: 'Diego Rodriguez',
        ubicacion: 'Campus(B1)',
        estado: 'Denegado'
      },
      {
        id: 15,
        fechaHora: '9:15 a.m',
        usuario: 'Sofia Hernandez',
        ubicacion: 'Campus(A2)',
        estado: 'Aceptado'
      },
      {
        id: 16,
        fechaHora: '9:30 a.m',
        usuario: 'Miguel Torres',
        ubicacion: 'Campus(C3)',
        estado: 'Aceptado'
      }
    ];

    this.totalPages = Math.ceil(this.asistencias.length / this.itemsPerPage);
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