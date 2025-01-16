import { TestBed } from '@angular/core/testing';

import { SlowQueryService } from './slow-queries.service';

describe('SlowQueriesService', () => {
  let service: SlowQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlowQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
