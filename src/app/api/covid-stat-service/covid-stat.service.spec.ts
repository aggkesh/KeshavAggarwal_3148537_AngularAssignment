import { TestBed } from '@angular/core/testing';

import { CovidStatService } from './covid-stat.service';

describe('CovidStatService', () => {
  let service: CovidStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
