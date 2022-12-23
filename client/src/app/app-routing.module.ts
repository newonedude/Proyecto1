import { DashboardPageTresComponent } from './dashboard-page-tres/dashboard-page-tres.component';
import { DashboardPageDosComponent } from './dashboard-page-dos/dashboard-page-dos.component';
import { DashboardTabComponent } from './dashboard-tab/dashboard-tab.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoginComponent } from './login/login.component';
import { PrediccionesPageComponent } from './predicciones/predicciones-page/predicciones-page.component';
import { CalificacionesPageComponent } from './calificaciones/calificaciones-page/calificaciones-page.component';
import { PreguntasEncuestaComponent } from './encuesta/preguntas-encuesta/preguntas-encuesta.component';
import { AsesoriasPageComponent } from './asesorias/asesorias-page/asesorias-page.component';
import { MatriculasPageComponent } from './matriculas/matriculas-page/matriculas-page.component';
import { SeccionesPageComponent } from './secciones/secciones-page/secciones-page.component';
import { EstudiantesPageComponent } from './estudiantes/estudiantes-page/estudiantes-page.component';
import { UsuariosPageComponent } from './usuarios/usuarios-page/usuarios-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionesPageComponent } from './asignaciones/asignaciones-page/asignaciones-page.component';

const routes: Routes = [
  { path: '', component: UsuariosPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'dashboard2', component: DashboardPageDosComponent },
  { path: 'dashboard3', component: DashboardPageTresComponent },
  { path: 'usuarios', component: UsuariosPageComponent },
  { path: 'estudiantes', component: EstudiantesPageComponent },
  { path: 'secciones', component: SeccionesPageComponent },
  { path: 'matriculas', component: MatriculasPageComponent },
  { path: 'asesorias', component: AsesoriasPageComponent },
  { path: 'encuesta-preguntas', component: PreguntasEncuestaComponent },
  { path: 'calificaciones', component: CalificacionesPageComponent },
  { path: 'predicciones', component: PrediccionesPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'asignaciones', component: AsignacionesPageComponent },
  { path: '*', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
