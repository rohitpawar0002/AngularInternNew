import { TestBed } from '@angular/core/testing';

import { HttpDropdownService } from './http-dropdown.service';

describe('HttpDropdownService', () => {
  let service: HttpDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
