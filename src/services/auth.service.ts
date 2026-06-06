import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://backendv-4q6s.onrender.com/api/auth'

  constructor(private http: HttpClient) {}

  crearEmpresa(data:any){
    return this.http.post(`${this.api}/empresa`,data)
  }

  registrarAdmin(data:any){
    return this.http.post(`${this.api}/register`,data)
  }

  login(data:any){
    return this.http.post(`${this.api}/login`,data)
  }
enviarCodigo(data:any){
  return this.http.post(`${this.api}/send-code`, data)
}

verificarCodigo(data:any){
  return this.http.post(`${this.api}/verify-code`, data)
}
  
  getPanel(){

const token = localStorage.getItem("token")

return this.http.get(
"https://backendv-4q6s.onrender.com/api/panel",
{
headers:{
Authorization:`Bearer ${token}`
}
})

}

}