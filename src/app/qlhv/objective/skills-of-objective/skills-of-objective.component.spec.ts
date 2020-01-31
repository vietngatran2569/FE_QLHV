import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsOfObjectiveComponent } from './skills-of-objective.component';

describe('SkillsOfObjectiveComponent', () => {
  let component: SkillsOfObjectiveComponent;
  let fixture: ComponentFixture<SkillsOfObjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsOfObjectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsOfObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
