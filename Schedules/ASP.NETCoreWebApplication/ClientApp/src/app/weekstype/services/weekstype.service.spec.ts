import { TestBed } from '@angular/core/testing';

import { WeekstypeService } from './weekstype.service';

describe('WeekstypeService', () => {
  let service: WeekstypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekstypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
