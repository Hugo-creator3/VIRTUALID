import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReportesService {

  private API = 'https://backendv-4q6s.onrender.com/api/reportes';

  constructor(private http: HttpClient) {}

  enviarReporte(data: any) {
    const token = localStorage.getItem('token');

    return this.http.post(this.API, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}