import { TestBed } from '@angular/core/testing';

import { PerformanceOptimizationService } from './performance-optimization.service';

describe('PerformanceOptimizationService', () => {
  let service: PerformanceOptimizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceOptimizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
