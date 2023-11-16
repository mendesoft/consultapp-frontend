import { Routes } from '@angular/router';
import { PacienteComponent } from './paciente/paciente.component';
import { PacienteEditarComponent } from './paciente/paciente-editar/paciente-editar.component';
import { CertGuard } from '../guard/cert.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const PagesRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate:[CertGuard]
  },
  {
    path: 'paciente',
    component: PacienteComponent,
    children: [
      {
        path: 'new',
        component: PacienteEditarComponent,
      },
      {
        path: 'edit/:id',
        component: PacienteEditarComponent,
      },
    ],canActivate:[CertGuard]
  },
];
