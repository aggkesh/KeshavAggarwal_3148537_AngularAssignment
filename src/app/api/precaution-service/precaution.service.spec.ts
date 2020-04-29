import { TestBed } from '@angular/core/testing';

import { PrecautionService } from './precaution.service';

describe('PrecautionService', () => {
  let service: PrecautionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecautionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
