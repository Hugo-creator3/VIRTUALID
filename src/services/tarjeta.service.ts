import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn:'root'
})
export class TarjetaService{

  api="https://backendv-4q6s.onrender.com/api/tarjeta"

  private tarjetaSubject = new BehaviorSubject<any>(null)

  tarjeta$ = this.tarjetaSubject.asObservable()

  constructor(private http:HttpClient){}

  cargarTarjeta(){

    const token = localStorage.getItem("token")

    this.http.get(this.api,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).subscribe((res:any)=>{

      this.tarjetaSubject.next(res)

    })

  }


  guardar(data:any){

    const token = localStorage.getItem("token")

    return this.http.post(this.api,data,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

  }

}