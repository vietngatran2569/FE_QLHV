import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivesOfSyllabusComponent } from './objectives-of-syllabus.component';

describe('ObjectivesOfSyllabusComponent', () => {
  let component: ObjectivesOfSyllabusComponent;
  let fixture: ComponentFixture<ObjectivesOfSyllabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectivesOfSyllabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesOfSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
