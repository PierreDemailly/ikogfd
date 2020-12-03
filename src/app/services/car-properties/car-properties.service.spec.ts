import { TestBed } from '@angular/core/testing';

import { CarPropertiesService } from './car-properties.service';

describe('CarPropertiesService', () => {
  let service: CarPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
