import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  API = 'https://backendv-4q6s.onrender.com/api/geo'

  constructor(private http: HttpClient) {}

  getConfig() {
    const token = localStorage.getItem('token')

    return this.http.get(this.API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  saveConfig(data: any) {
    const token = localStorage.getItem('token')

    return this.http.post(this.API, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}