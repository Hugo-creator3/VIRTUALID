import { Routes } from '@angular/router';
import { Conocenos } from './home/conocenos/conocenos';
import { Login } from './home/login/login';
import { Planes } from './home/planes/planes';
import { Contactanos } from './home/contactanos/contactanos';
import { Notificaciones } from './functions/notificaciones/notificaciones';
import { Tarjetas } from './functions/tarjetas/tarjetas';
import { Configuracion } from './functions/configuracion/configuracion';
import { Asistencias } from './functions/asistencias/asistencias';
import { ListaUsuarios } from './functions/lista-usuarios/lista-usuarios';
import { PanelControl } from './functions/panel-control/panel-control';
import { Dashboard } from './admin/dashboard/dashboard';
import { Settings } from './admin/settings/settings';
import { Reportes } from './functions/reportes/reportes';
import { Nabvar } from './shared/nabvar/nabvar';
import { NabvarFunctions } from './shared/nabvar-functions/nabvar-functions';




export const routes: Routes = [

   {
    path: '',
    component: Nabvar,
    children: [
  
      {
    path: 'conocenos',
    component: Conocenos,
    pathMatch: 'full',
  },
   {
    path: 'login',
    component: Login,
  },
   {
    path: 'planes',
    component: Planes,
  },
    {
    path: 'contactanos',
    component: Contactanos,
  },
  ]
},
   {
    path: '',
    component: NabvarFunctions,
    children: [
  
    {
    path: 'notificaciones',
    component: Notificaciones,
  },
    {
    path: 'tarjetas',
    component: Tarjetas,
  },
    {
    path: 'configuracion',
    component: Configuracion,
  },
    {
    path: 'asistencias',
    component: Asistencias,
  },
    {
    path: 'lista-usuarios',
    component: ListaUsuarios,
  },
    {
    path: 'panel-control',
    component: PanelControl,
    pathMatch: 'full',
  },
    {
    path: 'settings',
    component: Settings,
  },
    {
    path: 'reportes',
    component: Reportes,
  },

]},
    {
    path: 'dashboard',
    component: Dashboard,
  },
   
];
