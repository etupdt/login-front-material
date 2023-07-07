import { TestBed } from '@angular/core/testing';

import { ExemplaireService } from './exemplaire.service';

describe('ExemplaireService', () => {
  let service: ExemplaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExemplaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
