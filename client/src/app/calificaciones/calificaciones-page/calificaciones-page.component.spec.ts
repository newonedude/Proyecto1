import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesPageComponent } from './calificaciones-page.component';

describe('CalificacionesPageComponent', () => {
  let component: CalificacionesPageComponent;
  let fixture: ComponentFixture<CalificacionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
