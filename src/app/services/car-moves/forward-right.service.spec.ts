import { TestBed } from '@angular/core/testing';

import { ForwardRightService } from './forward-right.service';

describe('ForwardRightService', () => {
  let service: ForwardRightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForwardRightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
