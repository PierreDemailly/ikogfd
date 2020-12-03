import { TestBed } from '@angular/core/testing';

import { BackLeftService } from './back-left.service';

describe('BackLeftService', () => {
  let service: BackLeftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackLeftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
