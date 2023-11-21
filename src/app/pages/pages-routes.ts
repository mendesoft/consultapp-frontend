import { Routes } from '@angular/router';
import { PacienteComponent } from './paciente/paciente.component';
import { PacienteEditarComponent } from './paciente/paciente-editar/paciente-editar.component';
import { CertGuard } from '../guard/cert.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamenComponent } from './examen/examen.component';
import { ExamenEditarComponent } from './examen/examen-editar/examen-editar.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { EspecialidadEditarComponent } from './especialidad/especialidad-editar/especialidad-editar.component';
import { MedicoComponent } from './medico/medico.component';
import { Not403Component } from './not403/not403.component';

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

  {
    path: 'examen',
    component: ExamenComponent,
    children: [
      {
        path: 'new',
        component: ExamenEditarComponent,
      },
      {
        path: 'edit/:id',
        component: ExamenEditarComponent,
      },
    ],canActivate:[CertGuard]
  },
  {
    path: 'especialidad',
    component: EspecialidadComponent,
    children: [
      {
        path: 'new',
        component: EspecialidadEditarComponent,
      },
      {
        path: 'edit/:id',
        component: EspecialidadEditarComponent,
      },
    ],canActivate:[CertGuard]
  },

  { path: 'medico', component: MedicoComponent, canActivate: [CertGuard] },

  {path:'not-403', component:Not403Component},


];
