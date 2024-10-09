import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: 'quien-soy',
    loadComponent: () =>
      import('./components/quien-soy/quien-soy.component').then(
        (m) => m.QuienSoyComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./components/chat/chat.component').then((m) => m.ChatComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./components/ahorcado/ahorcado.component').then(
        (m) => m.AhorcadoComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'preguntados',
    loadComponent: () =>
      import('./components/preguntados/preguntados.component').then(
        (m) => m.PreguntadosComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'juego-propio',
    loadComponent: () =>
      import('./components/juego-propio/juego-propio.component').then(
        (m) => m.JuegoPropioComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'mayor-menor',
    loadComponent: () =>
      import('./components/mayor-menor/mayor-menor.component').then(
        (m) => m.MayorMenorComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./components/error/error.component').then(
        (m) => m.ErrorComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
