import { TestBed } from '@angular/core/testing';

import { SyncEnterGuard } from './sync-enter.guard';

describe('SyncEnterGuard', () => {
  let guard: SyncEnterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SyncEnterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
