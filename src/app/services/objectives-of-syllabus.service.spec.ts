import { TestBed, inject } from '@angular/core/testing';

import { ObjectivesOfSyllabusService } from './objectives-of-syllabus.service';

describe('ObjectivesOfSyllabusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectivesOfSyllabusService]
    });
  });

  it('should be created', inject([ObjectivesOfSyllabusService], (service: ObjectivesOfSyllabusService) => {
    expect(service).toBeTruthy();
  }));
});
