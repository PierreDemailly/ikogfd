import { TestBed } from '@angular/core/testing';

import { BackRightService } from './back-right.service';

describe('BackRightService', () => {
  let service: BackRightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackRightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
