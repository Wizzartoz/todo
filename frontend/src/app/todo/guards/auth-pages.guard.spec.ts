import { TestBed } from '@angular/core/testing';

import { AuthPagesGuard } from './auth-pages.guard';

describe('AuthPagesGuard', () => {
  let guard: AuthPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
