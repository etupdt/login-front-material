import { TestBed } from '@angular/core/testing';

import { StructService } from './struct.service';

describe('StructService', () => {
  let service: StructService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
