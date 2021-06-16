import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCalificacionComponent } from './modificar-calificacion.component';

describe('ModificarCalificacionComponent', () => {
  let component: ModificarCalificacionComponent;
  let fixture: ComponentFixture<ModificarCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarCalificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
