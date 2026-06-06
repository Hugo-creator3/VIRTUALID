import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, switchMap, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PanelService {

  private API = 'https://backendv-4q6s.onrender.com/api/panel/dashboard';
  private USERS_STATS_API = 'https://backendv-4q6s.onrender.com/api/panel/usuarios-estadisticas';
  private CHAT_API = 'https://backendml-1fpu.onrender.com/api/chat';

  constructor(private http: HttpClient) {}

  getDashboard() {
    const token = localStorage.getItem('token');

    return this.http.get<any>(this.API, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // 🔥 tiempo real cada 5s
  getDashboardLive() {
    const token = localStorage.getItem('token');

    return interval(5000).pipe(
      startWith(0),
      switchMap(() =>
        this.http.get<any>(this.API, {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
    );
  }

  getUsuariosEstadisticas() {
    const token = localStorage.getItem('token');

    return this.http.get<any>(this.USERS_STATS_API, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getUsuariosEstadisticasLive() {
    const token = localStorage.getItem('token');

    return interval(5000).pipe(
      startWith(0),
      switchMap(() =>
        this.http.get<any>(this.USERS_STATS_API, {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
    );
  }

  getConfiguracion() {

  const token = localStorage.getItem('token');

  return this.http.get<any>(
    'https://backendv-4q6s.onrender.com/api/configuracion',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

}

saveConfiguracion(config: any) {

  const token = localStorage.getItem('token');

  return this.http.post(
    'https://backendv-4q6s.onrender.com/api/configuracion',
    config,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

}
getAdmins() {

  const token = localStorage.getItem('token');

  return this.http.get<any[]>(
    'https://backendv-4q6s.onrender.com/api/panel/admins',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

}

sendVirtualiaMessage(pregunta: string, tenantId: number | null) {
  const token = localStorage.getItem('token');

  return this.http.post<any>(
    this.CHAT_API,
    {
      pregunta,
      tenant_id: tenantId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
}
