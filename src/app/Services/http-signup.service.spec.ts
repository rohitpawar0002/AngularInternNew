import { TestBed } from '@angular/core/testing';

import { HttpSignupService } from './http-signup.service';

describe('HttpSignupService', () => {
  let service: HttpSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
