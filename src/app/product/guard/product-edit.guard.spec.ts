import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { productEditGuard } from './product-edit.guard';

describe('productEditGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => productEditGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
