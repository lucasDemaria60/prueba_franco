import { TestBed } from '@angular/core/testing';

import { zorroService } from './zorro.service';

describe('ZorroService', () => {
  let service: zorroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(zorroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
