import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'http://localhost:3000/api/auth'

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

  
  getPanel(){

const token = localStorage.getItem("token")

return this.http.get(
"http://localhost:3000/api/panel",
{
headers:{
Authorization:`Bearer ${token}`
}
})

}

}