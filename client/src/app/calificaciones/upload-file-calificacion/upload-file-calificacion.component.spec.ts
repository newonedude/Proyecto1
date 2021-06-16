import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileCalificacionComponent } from './upload-file-calificacion.component';

describe('UploadFileCalificacionComponent', () => {
  let component: UploadFileCalificacionComponent;
  let fixture: ComponentFixture<UploadFileCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFileCalificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
