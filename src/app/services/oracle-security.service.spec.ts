import { TestBed } from '@angular/core/testing';

import { OracleSecurityService } from './oracle-security.service';

describe('OracleSecurityService', () => {
  let service: OracleSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OracleSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
