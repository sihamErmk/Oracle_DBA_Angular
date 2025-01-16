import { TestBed } from '@angular/core/testing';

import { RmanService } from './rman.service';

describe('RmanService', () => {
  let service: RmanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
