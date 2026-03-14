import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../services/auth.service'

@Component({
selector:'app-panel-control',
templateUrl:'./panel-control.html',
styleUrls: ['./panel-control.css']
})
export class PanelControl implements OnInit{

mensaje = ""
institucion = ""

constructor(private auth:AuthService){}

ngOnInit(){

this.auth.getPanel().subscribe((res:any)=>{

this.mensaje = res.mensaje
this.institucion = res.institucion

})

}

}