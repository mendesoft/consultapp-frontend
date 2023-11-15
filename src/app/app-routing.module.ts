import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
    {
      path: 'pages',component:LayoutComponent,
      loadChildren: () => import('./pages/pages-routes').then((x) => x.PagesRoutes)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
