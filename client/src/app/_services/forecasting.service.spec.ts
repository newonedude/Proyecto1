/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ForecastingService } from './forecasting.service';

describe('Service: Forecasting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForecastingService]
    });
  });

  it('should ...', inject([ForecastingService], (service: ForecastingService) => {
    expect(service).toBeTruthy();
  }));
});
