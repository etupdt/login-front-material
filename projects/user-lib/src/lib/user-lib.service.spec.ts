import { TestBed } from '@angular/core/testing';

import { UserLibService } from './user-lib.service';

describe('UserLibService', () => {
  let service: UserLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
