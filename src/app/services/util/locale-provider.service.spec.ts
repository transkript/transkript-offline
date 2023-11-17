import {TestBed} from '@angular/core/testing';

import {LocaleProviderService} from './locale-provider.service';

describe('LocaleProviderService', () => {
  let service: LocaleProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
