import { AccountService } from './../_services/account.service';
import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItem } from '../_models/nav-item';
import { NavService } from '../_services/nav.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainNavComponent {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  navItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: 'dashboard',
      children: [
        {
          displayName: 'Gráfico 1',
          iconName: 'bar_chart',
          route: 'dashboard'
        },
        {
          displayName: 'Gráfico 2',
          iconName: 'timeline',
          route: 'dashboard2'
        },
        {
          displayName: 'Gráfico 3',
          iconName: 'bar_chart',
          route: ''
        }
      ]
    },
    {
      displayName: 'Usuarios',
      iconName: 'supervisor_account',
      route: 'usuarios',
    },
    {
      displayName: 'Estudiantes',
      iconName: 'face',
      route: 'estudiantes',
    },
    {
      displayName: 'Secciones',
      iconName: 'group_work',
      route: 'secciones',
    },
    {
      displayName: 'Matrículas',
      iconName: 'how_to_reg',
      route: 'matriculas',
    },
    {
      displayName: 'Asignaciones',
      iconName: 'assignment',
      route: 'asignaciones',
    },
    {
      displayName: 'Asesorías',
      iconName: 'feedback',
      route: 'asesorias',
    },
    {
      displayName: 'Calificaciones',
      iconName: 'edit',
      route: 'calificaciones',
    },
    {
      displayName: 'Predicciones',
      iconName: 'trending_up',
      route: 'predicciones',
    }
  ]

  constructor(private breakpointObserver: BreakpointObserver, private accountService: AccountService, private navService: NavService) { }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}
