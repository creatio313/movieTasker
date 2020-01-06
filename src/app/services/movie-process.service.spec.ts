import { TestBed } from '@angular/core/testing';

import { MovieProcessService } from './movie-process.service';

describe('MovieProcessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieProcessService = TestBed.get(MovieProcessService);
    expect(service).toBeTruthy();
  });
});
