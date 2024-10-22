import { TestBed } from '@angular/core/testing';

import { CatgoryService } from './catgory.service';

describe('CatgoryService', () => {
  let service: CatgoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatgoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
