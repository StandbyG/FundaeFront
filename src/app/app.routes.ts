import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AjusteRazonableListComponent } from './ajustes/ajuste-razonable-list/ajuste-razonable-list.component';
import { AjusteRazonableCreateComponent } from './ajustes/ajuste-razonable-create/ajuste-razonable-create.component';
import { AjusteRazonableEditComponent } from './ajustes/ajuste-razonable-edit/ajuste-razonable-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './admin-guard';
import { SearchComponent } from './search/search';
import { CrearVerificacionComponent } from './crear-verificacion/crear-verificacion';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ajustes', component: AjusteRazonableListComponent },
  { path: 'ajustes/create', component: AjusteRazonableCreateComponent },
  { path: 'ajustes/edit/:id', component: AjusteRazonableEditComponent },
  {
    path: 'ajustes/usuario/:id',
    loadComponent: () =>
      import('./pages/mis-ajustes').then(m => m.MisAjustesComponent)
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'search', component: SearchComponent },  // Protegida por AdminGuard
  { path: 'verificacion/create', component: CrearVerificacionComponent },

  { path: '**', redirectTo: 'login' },

];

