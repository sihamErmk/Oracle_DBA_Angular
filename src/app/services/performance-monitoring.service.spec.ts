import { TestBed } from '@angular/core/testing';

import { PerformanceMonitoringService } from './performance-monitoring.service';

describe('PerformanceMonitoringService', () => {
  let service: PerformanceMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
