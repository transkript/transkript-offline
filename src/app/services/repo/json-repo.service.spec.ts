import { TestBed } from '@angular/core/testing';

import { JsonRepoService } from './json-repo.service';

describe('JsonRepoService', () => {
  let service: JsonRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
