import { TestBed } from '@angular/core/testing';

import { CheckIsLoggedInGuard } from './check-is-logged-in.guard';

describe('CheckIsLoggedInGuard', () => {
  let guard: CheckIsLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckIsLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
