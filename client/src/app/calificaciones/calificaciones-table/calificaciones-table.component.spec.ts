import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesTableComponent } from './calificaciones-table.component';

describe('CalificacionesTableComponent', () => {
  let component: CalificacionesTableComponent;
  let fixture: ComponentFixture<CalificacionesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
