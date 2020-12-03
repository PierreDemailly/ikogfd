import { TestBed } from '@angular/core/testing';

import { CarMovesService } from './car-moves.service';

describe('CarMovesService', () => {
  let service: CarMovesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarMovesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
