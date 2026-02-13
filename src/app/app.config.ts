import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
