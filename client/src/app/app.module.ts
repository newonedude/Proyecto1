import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UsuariosPageComponent } from './usuarios/usuarios-page/usuarios-page.component';
import { UsuariosTableComponent } from './usuarios/usuarios-table/usuarios-table.component';
import { RegistrarUsuariosComponent } from './usuarios/registrar-usuarios/registrar-usuarios.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { EstudiantesPageComponent } from './estudiantes/estudiantes-page/estudiantes-page.component';
import { EstudiantesTableComponent } from './estudiantes/estudiantes-table/estudiantes-table.component';
import { RegistrarEstudiantesComponent } from './estudiantes/registrar-estudiantes/registrar-estudiantes.component';
import { DatePipe } from '@angular/common';
import { UploadFileComponent } from './upload-file/upload-file.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SeccionesPageComponent } from './secciones/secciones-page/secciones-page.component';
import { SeccionesTableComponent } from './secciones/secciones-table/secciones-table.component';
import { RegistrarSeccionesComponent } from './secciones/registrar-secciones/registrar-secciones.component';
import { MatriculasPageComponent } from './matriculas/matriculas-page/matriculas-page.component';
import { MatriculasTableComponent } from './matriculas/matriculas-table/matriculas-table.component';
import { RegistrarMatriculasComponent } from './matriculas/registrar-matriculas/registrar-matriculas.component';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
      MainNavComponent,
      UsuariosPageComponent,
      UsuariosTableComponent,
      RegistrarUsuariosComponent,
      EstudiantesPageComponent,
      EstudiantesTableComponent,
      RegistrarEstudiantesComponent,
      UploadFileComponent,
      SeccionesPageComponent,
      SeccionesTableComponent,
      RegistrarSeccionesComponent,
      MatriculasPageComponent,
      MatriculasTableComponent,
      RegistrarMatriculasComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDatepickerModule
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
