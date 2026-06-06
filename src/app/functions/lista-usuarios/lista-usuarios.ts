import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';


interface User {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
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
  searchTerm: string = '';
filteredUsers: User[] = [];

nuevoUsuario: any = {
  nombre: '',
  apellidos: '',
  email: '',
  password: '',
  telefono: '',
  genero: ''
};

usuarioEnEdicion: any = {
  id: null,
  nombre: '',
  apellidos: '',
  email: '',
  telefono: ''
};

showAddModal: boolean = false;
showEditModal: boolean = false;
showConfirmModal: boolean = false;
showStatusModal: boolean = false;

confirmModalData = {
  title: '',
  message: '',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  onConfirm: () => {}
};

statusModalData = {
  title: '',
  message: '',
  type: 'success' as 'success' | 'error' | 'info'
};

  ngOnInit() {
    this.loadUsers();   
  }
  constructor(
    private usuariosService: UsuariosService,
    private cdr: ChangeDetectorRef
  ) {}

loadUsers() {
  this.usuariosService.getUsuarios().subscribe({
    next: (data) => {

      this.users = data.map(u => ({
  id: Number(u.id_usuario),
  nombre: `${u.nombre} ${u.apellidos}`,
  email: u.email,
  telefono: u.telefono || 'Sin teléfono',
  fechaRegistro: new Date(u.fecha_creacion).toLocaleDateString(),
  selected: false
}));

this.filteredUsers = [...this.users];
      this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
      this.currentPage = 1;
      this.updatePaginatedUsers();
    },
    error: (err) => {
      console.error(err);
    }
  });
}
  

   
  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  applyFilters() {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredUsers = this.users.filter(u =>
      u.nombre.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.telefono.toLowerCase().includes(term)
    );

    this.totalPages = Math.max(1, Math.ceil(this.filteredUsers.length / this.itemsPerPage));
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.updatePaginatedUsers();
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.paginatedUsers.forEach(user => user.selected = checked);
  }
deleteUser(user: User) {
  this.confirmModalData = {
    title: 'Eliminar usuario',
    message: `¿Seguro que deseas eliminar a ${user.nombre}?`,
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
    onConfirm: () => this.confirmDeleteUser(user)
  };
  this.showConfirmModal = true;
}

confirmDeleteUser(user: User) {
  this.showConfirmModal = false;

  this.usuariosService.deleteUsuario(user.id).subscribe({
    next: () => {
      this.users = this.users.filter(u => u.id !== user.id);
      this.applyFilters();
      this.openStatusModal('Usuario eliminado', 'El usuario se eliminó correctamente.', 'success');
    },
    error: (err) => {
      console.error(err);
      this.openStatusModal('No se pudo eliminar', 'Ocurrió un error al eliminar el usuario.', 'error');
    }
  });
}
 

  showMoreOptions(user: User) {
    console.log('Más opciones para:', user);
    this.openStatusModal('Más opciones', `Esta acción estará disponible próximamente para ${user.nombre}.`, 'info');
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

  editUser(user: User) {
    const [nombre, ...apellidosArr] = user.nombre.split(' ');
    this.usuarioEnEdicion = {
      id: user.id,
      nombre: nombre,
      apellidos: apellidosArr.join(' '),
      email: user.email,
      telefono: user.telefono === 'Sin teléfono' ? '' : user.telefono
    };
    this.showEditModal = true;
  }

  submitEditUser() {
    if (!this.usuarioEnEdicion.nombre || !this.usuarioEnEdicion.email) {
      this.openStatusModal('Campos incompletos', 'Completa el nombre y correo electrónico para guardar los cambios.', 'error');
      return;
    }

    const usuarioActualizado = { ...this.usuarioEnEdicion };
    this.closeEditModal();
    this.updateEditedUser(usuarioActualizado);
  }

  updateEditedUser(usuarioActualizado: any) {
    this.usuariosService.updateUsuario(usuarioActualizado.id, {
      nombre: usuarioActualizado.nombre,
      apellidos: usuarioActualizado.apellidos,
      email: usuarioActualizado.email,
      telefono: usuarioActualizado.telefono
    }).subscribe({
      next: (response: any) => {
        // El backend devuelve { count: n }, usamos los datos del formulario
        const index = this.users.findIndex(u => u.id === usuarioActualizado.id);
        if (index !== -1) {
          const nombreCompleto = `${usuarioActualizado.nombre} ${usuarioActualizado.apellidos}`.trim();
          this.users[index] = {
            ...this.users[index],
            nombre: nombreCompleto,
            email: usuarioActualizado.email,
            telefono: usuarioActualizado.telefono || 'Sin teléfono'
          };
          
          const filteredIndex = this.filteredUsers.findIndex(u => u.id === usuarioActualizado.id);
          if (filteredIndex !== -1) {
            this.filteredUsers[filteredIndex] = this.users[index];
          }

          this.applyFilters();
        }
        this.openStatusModal('Usuario actualizado', 'Los cambios se guardaron correctamente.', 'success');
      },
      error: (err) => {
        console.error('Error:', err);
        this.openStatusModal('No se pudo actualizar', 'No fue posible guardar los cambios del usuario.', 'error');
      }
    });
  }

  closeAddModal() {
    this.showAddModal = false;
    this.nuevoUsuario = {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      telefono: '',
      genero: ''
    };
  }

  closeEditModal() {
    this.showEditModal = false;
    this.usuarioEnEdicion = {
      id: null,
      nombre: '',
      apellidos: '',
      email: '',
      telefono: ''
    };
  }
filterUsers() {
  this.currentPage = 1;
  this.applyFilters();
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
  this.showAddModal = true; // abrir modal
}
submitNewUser() {
  if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
    this.openStatusModal('Campos incompletos', 'Completa nombre, correo y contraseña para agregar un usuario.', 'error');
    return;
  }

  this.usuariosService.addUsuario(this.nuevoUsuario).subscribe({
    next: (res) => {
      const u = res.usuario;
      this.users.unshift({
        id: Number(u.id_usuario),
        nombre: `${u.nombre} ${u.apellidos}`,
        email: u.email,
        telefono: u.telefono || 'Sin teléfono',
        fechaRegistro: new Date(u.fecha_creacion).toLocaleDateString(),
        selected: false
      });
      this.filteredUsers = [...this.users];
      this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
      this.currentPage = 1;
      this.updatePaginatedUsers();
      this.closeAddModal();
      this.openStatusModal('Usuario agregado', 'El usuario se registró correctamente.', 'success');
    },
    error: (err) => {
      console.error(err);
      this.openStatusModal('No se pudo agregar', 'No fue posible registrar el usuario. Revisa los datos e inténtalo de nuevo.', 'error');
    }
  });
}

  openStatusModal(title: string, message: string, type: 'success' | 'error' | 'info') {
    this.statusModalData = { title, message, type };
    this.showStatusModal = true;
    this.cdr.detectChanges();
  }

  closeStatusModal() {
    this.showStatusModal = false;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
  }

}
