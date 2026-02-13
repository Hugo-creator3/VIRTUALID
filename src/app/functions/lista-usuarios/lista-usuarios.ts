import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  nombre: string;
  email: string;
  ubicacion: string;
  fechaRegistro: string;
  selected: boolean;
}

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  ngOnInit() {
    this.loadUsers();
    this.updatePaginatedUsers();
  }

  loadUsers() {
    this.users = [
      {
        id: 1,
        nombre: 'Leslie Maya',
        email: 'leslie@gmail.com',
        ubicacion: 'Los Angeles, CA',
        fechaRegistro: 'October 2, 2010',
        selected: false
      },
      {
        id: 2,
        nombre: 'Josie Deck',
        email: 'josie@gmail.com',
        ubicacion: 'Cheyenne, WY',
        fechaRegistro: 'October 3, 2011',
        selected: false
      },
      {
        id: 3,
        nombre: 'Alex Pfeiffer',
        email: 'alex@gmail.com',
        ubicacion: 'Cheyenne, WY',
        fechaRegistro: 'May 20, 2015',
        selected: false
      },
      {
        id: 4,
        nombre: 'Mike Dean',
        email: 'mike@gmail.com',
        ubicacion: 'Syracuse, NY',
        fechaRegistro: 'July 14, 2015',
        selected: false
      },
      {
        id: 5,
        nombre: 'Mateus Cunha',
        email: 'cunha@gmail.com',
        ubicacion: 'Luanda, AN',
        fechaRegistro: 'October, 2016',
        selected: false
      },
      {
        id: 6,
        nombre: 'Nzola Uemo',
        email: 'nzola@gmail.com',
        ubicacion: 'Lagos, NG',
        fechaRegistro: 'June 5, 2016',
        selected: false
      },
      {
        id: 7,
        nombre: 'Antony Mack',
        email: 'mack@gmail.com',
        ubicacion: 'London, ENG',
        fechaRegistro: 'June 15, 2015',
        selected: false
      },
      {
        id: 8,
        nombre: 'André da Silva',
        email: 'andré@gmail.com',
        ubicacion: 'São Paulo, BR',
        fechaRegistro: 'March 13, 2018',
        selected: false
      },
      {
        id: 9,
        nombre: 'Jorge Ferreira',
        email: 'jorge@gmail.com',
        ubicacion: 'Huambo, Angola',
        fechaRegistro: 'March 14, 2018',
        selected: false
      },
      {
        id: 10,
        nombre: 'Maria Garcia',
        email: 'maria@gmail.com',
        ubicacion: 'Madrid, ES',
        fechaRegistro: 'January 5, 2019',
        selected: false
      },
      {
        id: 11,
        nombre: 'John Smith',
        email: 'john@gmail.com',
        ubicacion: 'New York, NY',
        fechaRegistro: 'February 15, 2019',
        selected: false
      },
      {
        id: 12,
        nombre: 'Ana Santos',
        email: 'ana@gmail.com',
        ubicacion: 'Lisbon, PT',
        fechaRegistro: 'March 20, 2019',
        selected: false
      },
      {
        id: 13,
        nombre: 'Carlos Mendez',
        email: 'carlos@gmail.com',
        ubicacion: 'Mexico City, MX',
        fechaRegistro: 'April 10, 2019',
        selected: false
      },
      {
        id: 14,
        nombre: 'Sophie Laurent',
        email: 'sophie@gmail.com',
        ubicacion: 'Paris, FR',
        fechaRegistro: 'May 25, 2019',
        selected: false
      },
      {
        id: 15,
        nombre: 'Hans Mueller',
        email: 'hans@gmail.com',
        ubicacion: 'Berlin, DE',
        fechaRegistro: 'June 30, 2019',
        selected: false
      }
    ];

    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.paginatedUsers.forEach(user => user.selected = checked);
  }

  deleteUser(user: User) {
    if (confirm(`¿Estás seguro de eliminar a ${user.nombre}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
      this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
      
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = this.totalPages;
      }
      
      this.updatePaginatedUsers();
      console.log('Usuario eliminado:', user);
    }
  }

  editUser(user: User) {
    console.log('Editar usuario:', user);
    alert(`Editar usuario: ${user.nombre}`);
  }

  showMoreOptions(user: User) {
    console.log('Más opciones para:', user);
    alert(`Más opciones para: ${user.nombre}`);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedUsers();
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

  searchUser() {
    console.log('Buscar usuario');
    alert('Función de búsqueda - Próximamente');
  }

  exportUsers() {
    console.log('Exportar usuarios');
    alert('Exportar usuarios - Próximamente');
  }

  addUser() {
    console.log('Agregar usuario');
    alert('Agregar nuevo usuario - Próximamente');
  }
}