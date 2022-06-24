import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Is Loading should be truthy of value False on Init', () => {
    expect(service.isLoading).toBeTruthy();
    expect(service.isLoading.value).toEqual(false);
    console.log('is loading value is false');
  })
});
