import { Routes } from '@angular/router';
import { PacienteComponent } from './paciente/paciente.component';
import { PacienteEditarComponent } from './paciente/paciente-editar/paciente-editar.component';

export const PagesRoutes: Routes = [
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
    ]
  }
];
