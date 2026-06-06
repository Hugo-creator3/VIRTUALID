import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface NuevoUsuario {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  telefono?: string;
  genero?: string;
}

@Injectable({
  providedIn: 'root'
})


export class UsuariosService {

  

  private API = 'https://backendv-4q6s.onrender.com/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios() {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(this.API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
 

  deleteUsuario(id: number) {
    const token = localStorage.getItem('token');

    return this.http.delete(`${this.API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  updateUsuario(id: number, data: any) {
  const token = localStorage.getItem('token');

  return this.http.put(`${this.API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
addUsuario(data: NuevoUsuario) {

  const token = localStorage.getItem('token');

  return this.http.post<any>(this.API, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

}

}