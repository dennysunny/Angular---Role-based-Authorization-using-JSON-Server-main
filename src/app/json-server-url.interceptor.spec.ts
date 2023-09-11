import { TestBed } from '@angular/core/testing';

import { JsonServerUrlInterceptor } from './json-server-url.interceptor';

describe('JsonServerUrlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JsonServerUrlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JsonServerUrlInterceptor = TestBed.inject(JsonServerUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
