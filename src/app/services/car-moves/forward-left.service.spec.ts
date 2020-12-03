import { TestBed } from '@angular/core/testing';

import { ForwardLeftService } from './forward-left.service';

describe('ForwardLeftService', () => {
  let service: ForwardLeftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForwardLeftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
