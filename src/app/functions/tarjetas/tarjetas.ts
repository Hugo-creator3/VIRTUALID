import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { TarjetaService } from '../../../services/tarjeta.service'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Observable } from 'rxjs'

declare var ColorThief: any; // <--- Esto le dice a Angular: "Confía en mí, esto existe en el index.html"


@Component({
selector:'app-tarjetas',
standalone: true,
imports:[CommonModule, FormsModule],
templateUrl:'./tarjetas.html',
styleUrl:'./tarjetas.css'
})
export class Tarjetas implements OnInit, OnDestroy {


logo:any
nombreInstitucion=""
logoPreview:any
colores:string[]=[]
gradiente:string=""

tarjeta$!: Observable<any>
  saveStatus = false
  private saveTimeout: number | null = null

constructor(private tarjeta:TarjetaService, private cdr: ChangeDetectorRef){}
ngOnInit() {
  this.tarjeta$ = this.tarjeta.tarjeta$;

  this.tarjeta$.subscribe((res: any) => {
    if (res) {
      this.nombreInstitucion = res.nombre_institucion;
      // Asignamos los colores desde la DB
      this.colores = [
        res.color_primario,
        res.color_secundario,
        res.color_terciario,
        res.color_cuarto
      ].filter(c => c); // Filtramos nulos por si acaso

      // ¡IMPORTANTE! Generar el gradiente al cargar
      this.generarGradiente();
    }
  });
 this.tarjeta.cargarTarjeta();
}

ngOnDestroy() {
  if (this.saveTimeout) {
    window.clearTimeout(this.saveTimeout)
  }
}

private showSaveFeedback() {
  this.saveStatus = true
  this.cdr.detectChanges()

  if (this.saveTimeout) {
    window.clearTimeout(this.saveTimeout)
  }

  this.saveTimeout = window.setTimeout(() => {
    this.saveStatus = false
    this.cdr.detectChanges()
  }, 2200)
}

guardar() {
  const data = {
    // Usamos el valor del input [(ngModel)], no el del observable antiguo
    nombre_institucion: this.nombreInstitucion, 
    logo_url: this.logoPreview,
    color_primario: this.colores[0],
    color_secundario: this.colores[1],
    color_terciario: this.colores[2],
    color_cuarto: this.colores[3]
  };

  this.tarjeta.guardar(data).subscribe(() => {
    this.showSaveFeedback();
    this.tarjeta.cargarTarjeta();
  });
}

cargarLogo(event:any){

const file = event.target.files[0]

if(!file) return

if(!file.type.startsWith("image/")){
alert("Solo se permiten imágenes")
return
}

const reader = new FileReader()

reader.onload = (e:any)=>{

const img = new Image()
img.crossOrigin = "Anonymous"
img.src = e.target.result
img.onload = () => {
  try {
    // Como lo cargamos por UMD, la clase está disponible globalmente
    const colorThief = new ColorThief(); 
    const palette = colorThief.getPalette(img, 4);

    if (palette) {
      this.colores = palette.map((c: any) =>
        `rgb(${c[0]},${c[1]},${c[2]})`
      );
      this.generarGradiente();
    }
  } catch (error) {
    console.error("Error al extraer colores:", error);
  }
};
}

reader.readAsDataURL(file)

}
generarGradiente(){

if(this.colores.length < 2) return

this.gradiente = `linear-gradient(135deg, ${this.colores[0]}, ${this.colores[1]})`

}
}