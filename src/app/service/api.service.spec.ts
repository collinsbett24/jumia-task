import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let ServerUrl: string = 'https://randomuser.me/api/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud return list of users', () => {
    service.getUserInformation().subscribe((result: any) => {
      expect(result).toBeTruthy();
      expect(result.results).toBeTruthy();
      expect(result.results.length).toBeGreaterThan(0);
      console.log('result Verified');
    });

    const req = httpMock.expectOne(`${ServerUrl}?results=30`);
    expect(req.request.method).toBe('GET');
    req.flush({
      results: [
        {
          name: 'Mr',
          first: 'Collins',
          last: 'Bett'
        }
      ]
    })
  })
});

