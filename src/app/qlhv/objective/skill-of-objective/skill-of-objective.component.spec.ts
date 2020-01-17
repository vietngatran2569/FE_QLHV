import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillOfObjectiveComponent } from './skill-of-objective.component';

describe('SkillOfObjectiveComponent', () => {
  let component: SkillOfObjectiveComponent;
  let fixture: ComponentFixture<SkillOfObjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillOfObjectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillOfObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
