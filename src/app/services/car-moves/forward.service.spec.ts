import { TestBed } from '@angular/core/testing';

import { ForwardService } from './forward.service';

describe('ForwardService', () => {
  let service: ForwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
