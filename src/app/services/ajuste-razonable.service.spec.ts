import { TestBed } from '@angular/core/testing';

import { AjusteRazonableService } from './ajuste-razonable.service';

describe('AjusteRazonableService', () => {
  let service: AjusteRazonableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjusteRazonableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
