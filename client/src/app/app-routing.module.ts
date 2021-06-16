import { PreguntasEncuestaComponent } from './encuesta/preguntas-encuesta/preguntas-encuesta.component';
import { AsesoriasPageComponent } from './asesorias/asesorias-page/asesorias-page.component';
import { MatriculasPageComponent } from './matriculas/matriculas-page/matriculas-page.component';
import { SeccionesPageComponent } from './secciones/secciones-page/secciones-page.component';
import { EstudiantesPageComponent } from './estudiantes/estudiantes-page/estudiantes-page.component';
import { UsuariosPageComponent } from './usuarios/usuarios-page/usuarios-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{path:'', component: DashboardPageComponent},
  //{path:'dashboard', component: DashboardPageComponent},
  {path:'usuarios', component: UsuariosPageComponent},
  {path:'estudiantes', component: EstudiantesPageComponent},
  {path:'secciones', component: SeccionesPageComponent},
  {path:'matriculas', component: MatriculasPageComponent},
  {path:'asesorias', component: AsesoriasPageComponent},
  {path:'encuesta-preguntas', component: PreguntasEncuestaComponent}
  //{path:'**', component: DashboardPageComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
