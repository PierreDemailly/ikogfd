import { TestBed } from '@angular/core/testing';

import { CarManipulationService } from './car-manipulation.service';

describe('CarManipulationService', () => {
  let service: CarManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
